const mongoose = require('mongoose')

const Scheme = mongoose.Schema;

const cartScheme = new Scheme({

    products:{
        type: Array,
    },
    totalprice: {
        type: Number
    },
    totalamount: {
        type:String
    }
    },
    {
        timestamps:true
    }
)

const Cart = mongoose.model("Cart",cartScheme)
module.exports = Cart;
