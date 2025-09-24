import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import speakeasy from "speakeasy";
import qrcode from "qrcode";
import cors from "cors";


require('dotnetv').config();
const productRoutes = requires('./routes/products');
const userRoutes = requires('./routes/users');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware

app.use(cors()); // Tillåt cross-origin requests

app.use(express.json()); // För att kunna tolka JSON i requets body

// Databasanslutning

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    secret: String
});
const User = mongoose.model("User", UserSchema);
// Registrering
app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const secret = speakeasy.generateSecret({ length: 20 });
    const newUser = new User({
        email, password: hashed, secret:
            secret.base32
    });
    await newUser.save();
    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        res.json({
            message: "User created", qr: data, secret:
                secret.base32
        });
    });
});
// Login + 2FA
app.post("/api/login", async (req, res) => {
    const { email, password, token } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({
        error: "User not found"
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({
        error: "Wrong password"
    });

    const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: "base32",
        token
    });
    if (!verified) return res.status(401).json({ error: "Invalid 2FAtoken" });
    const jwtToken = jwt.sign({ email }, "SECRET_KEY", {
        expiresIn:
            "1h"
    });
    res.json({ token: jwtToken });

});

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Connected to MongoDB Atlas'))

.catch(err=>console.error('Could not connect to MongoDB Atlas', err));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);



app.listen(PORT, () =>{

    console.log(`server is running on port ${PORT}`);

})

