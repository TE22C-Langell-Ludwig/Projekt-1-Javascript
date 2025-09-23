const mongoose = require('mongoose');

const UserBlueprint = new mongoose.Schema({

    name:{

        type: String,
        required: true,
    },


    role:{

        type: Boolean,
        required: true
    },


    password:{

        type: String,
        required: true
    }

}, {timeseries: true});

module.exports=mongoose.model('User', UserSchema);
