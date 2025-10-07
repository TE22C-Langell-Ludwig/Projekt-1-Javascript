import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import speakeasy from "speakeasy";
import qrcode from "qrcode";
import cors from "cors";
import dotenv from 'dotenv';

import User from './models/user.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;


// Registrering
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const secret = speakeasy.generateSecret({ length: 20 });

    const newUser = new User({
      name,
      email,
      password: hashed,
      admin: admin || false,
      secret: secret.base32
    });

    await newUser.save();

    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to generate QR code" });

      res.json({
        message: "User created",
        qr: data,
        secret: secret.base32
      });
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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
    res.json({ token: jwtToken, admin: user.admin });

});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))

    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);



app.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`);

})

