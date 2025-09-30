import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.admin = !user.admin;
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User deleted', id: deletedUser._id });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
});

export default router;