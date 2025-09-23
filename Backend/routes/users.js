

const express = require('express');
const user = require('../models/user');
const { use } = require('react');

const router = express.Router();

const User = request('../models/user')


//GET


router.get('/', async (req, res) => {

    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);

});

// POST

router.post('/', async (req, res) => {

    const newUser = new User({
        teext: req.body.text
    });

    const saveUser = await newUser.save();

    res.sendStatus(201).json(saveUser);

});

// PUT

router.put('/:id', async (req,res) =>{ 


    const user = await User.findById(req.params.id);

    user.admin = !user.admin;

    await user.save();

    res.json(user)
});

// DELETE

router.delete('/:id', async (req, res) => {

    const deleteUser = await User.findByIdAndDelete(req.params.id);

    res.json({message: 'User deleted', id: deleteUser._id});

});

module.exports = router;

