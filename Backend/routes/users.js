

const express = require('express');
const user = require('../models/user');

const router = express.Router();

const User = request('../models/user')


//GET


router.get('/', async (req, res) => {

    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);

});

//POST

