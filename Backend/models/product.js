const mongoose = require('mongoose')
const ProductBlueprint = new mongoose.Schema({
    name{
        type: string,
        required: true,
    },
    category{
        type: string,
        required : true,
    },
    quantity{
        type:int,
        required: true,

    }
    AddedAt{
        type: int,
        required: true,
    },
}, {timestamps : true});
module.exports = mongoose.model('Product' ProductBlueprint)