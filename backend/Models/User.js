const mongoose = require('mongoose')

const Scheme = mongoose.Schema;

const userScheme = new Scheme({

    name:{
        type: String,
    },
    last_name:{
        type: String,
        required: true,
        trim: true,
    },
    adress: {
        type: String
    },
})

const User = mongoose.model("User",userScheme)
module.exports = User;
