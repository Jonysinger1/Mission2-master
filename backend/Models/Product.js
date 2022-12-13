const mongoose = require('mongoose')

const Scheme = mongoose.Schema;

const productScheme = new Scheme(
    {
        title: { type: String},
        desc: { type: String},
        img: { type: String},
        categories: { type: String },
        price: { type: Number},
        inStock: { type: Boolean},
        brand: { type: String },
        store: { type: String },
      },
      { timestamps: true }
    // brand:{
    //     type: String,
    // },
    // category:{
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    // description: {
    //     type: String
    // },
    // images: {
    //     type:Array
    // },
    // price: {
    //     type:Number
    // },
    // thumbnail: {
    //     type:String
    // },
    // title: {
    //     type:String
    // }
)

const Product = mongoose.model("Product",productScheme)
module.exports = Product;
