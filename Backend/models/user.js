const mongoose = require('mongoose');

const UserBlueprint = new mongoose.Schema({

    name:{

        type: String,
        required: true,
    },


    admin:{

        type: Boolean,
        required: true,
        default: false
    },


    password:{

        type: String,
        required: true
    }

}, {timeseries: true});

module.exports=mongoose.model('User', UserSchema);
