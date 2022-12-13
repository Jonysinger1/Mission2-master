import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../Components/Single_Product"
import Single_Product from '../Components/Single_Product';
import { Link, useNavigate } from 'react-router-dom';
import { createCart, getAllProducts, getCart, updateCartToDB } from '../apiCalls';
import styled from 'styled-components';
import {ShoppingCartOutlined } from "@material-ui/icons";
import Navbar from '../Components/navbar';


const Button = styled.button`

  padding: 15px;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 20px;
  width: 150px;
  border-radius: 10px;
  position: relative;
  text-align: center;
  align-items: center;

  &:hover {
    background-color: gray;
  }
`;

function App() {
const navigate = useNavigate()
const [products,setProducts] = useState([])
const [cartProducts,setCartProducts] = useState([])
const [cartid,setCartId] = useState()



const cartHandler = async () => {
    let total = 0;
    cartProducts.forEach(element => {
        total+= element.price
    }); 
  await updateCartToDB({
    _id: cartid,
    products: cartProducts,
    totalprice: total,
    totalamount: cartProducts.length
  })
  navigate("/cart/"+cartid)
}

  useEffect(()=>{
    async function FD() {
      const res = await getAllProducts()
      setProducts(res)
      const tempCart = await createCart()
      console.log(tempCart.data.insertedId);
      setCartId(tempCart.data.insertedId)
    }
    FD()
  },[])
  
            
  return (
    <div className="App" style={{"display":"flex","alignItems":"center","flexDirection":"column"}}>
      <Navbar/>
    <div style={{"flex-direction":"row","display":"flex","width":"20%","justify-content":"space-between"}}>
      <div style={{"alignSelf":"flex-end"}}>
      <Button  onClick={cartHandler}>My Cart</Button>
      </div>
    </div>
    
    <br />
      {products.map((product)=>{
        return <div key={product._id} style={{"display":"flex","flex-direction":"row","align-items":"center","justify-content":"space-between","border-radius":"20px","border":"2px solid black", "width":"80%","margin-bottom":"10px"}}>
          <Single_Product product={product} setfunc={setCartProducts} cart={cartProducts}/>
        </div>
      })}
    </div>
  );
}

export default App;
