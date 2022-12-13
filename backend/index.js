const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const Product = require('./Models/Product')
const Cart = require('./Models/Cart')
const User = require("./Models/User")
const dotenv = require('dotenv');
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());




app.get("/products",async(req,res)=>{
    const temp = await Product.find()
    res.send(temp)
   
})

app.get("/products/:id",async (req,res)=>{
    const response = await Product.findById(req.params.id)
    res.send(response)
})

app.post("/cart",async (req,res)=> {
    await Cart.deleteMany({})
    const temp = {
        products: [],
        totalprice: 0,
        totalamount: 0
    }
    const response = await Cart.collection.insertOne(temp)
    res.send(response)
})

app.put("/cart/add",async (req,res) => {
    const temp = {
        products: req.body.products,
        totalamount: req.body.totalamount,
        totalprice: req.body.totalprice
    }
    console.log(req.body);
    console.log(req.body._id);
    const response = await Cart.findOneAndUpdate({_id: req.body._id},temp)
    res.send(response)
})


app.get("/cart/:id",async (req,res)=>{
    const response = await Cart.findById(mongoose.Types.ObjectId(req.params.id))
    console.log(response);
    res.send(response)
})

app.post("/user",async (req,res)=> {
    const user = req.body
    const response = await User.collection.insertOne(user)
    res.send(response)
})



app.listen(3001,()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log('seccefully connected to db'))
    console.log('The Server is now listening on PORT 3001 !');
})