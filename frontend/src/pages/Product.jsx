import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../apiCalls';
import Navbar from '../Components/navbar';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 91vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 200;
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  margin-bottom: 20px;
  text-decoration: underline;
  text-align: center;
`;

const Desc = styled.p`
  margin: 20px 0px;
  text-decoration: underline;
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 40px;
  margin-bottom: 40px;
  color: #F5FFFA;

`;

const Button = styled.button`

  padding: 15px;
  font-weight: 600;
  font-size: 20px;
  width: 250px;
  border-radius: 10px;
  position: relative;
  text-align: center;
  align-items: center;
  background-color: #F5FFFA;

  &:hover {
    background-color: gray;
  }
`;

function Product() {
  
const [product,setProduct] = useState({})
const [images,setImages] = useState([])
const navigate = useNavigate()
const id = window.location.pathname.split("/")[1]
  useEffect(()=>{
    async function FD() {
      const res = await getProductById(id)
      setProduct(res)
      setImages(res.images)
    }
    FD()
  },[])
  
            
  return (
    <Container>
      <Navbar/>
      <Wrapper>
        
        <InfoContainer>
          <Title style>{product.title}</Title>
          <img src={product.img} style={{"width":"100px","height":"120px","alignSelf":"flex-left"}}/>
          <Desc> {product.desc}</Desc>
          <Desc>Available NOW at: {product.store}</Desc>
          <Desc>Brand : {product.brand}</Desc>
          <Price>Only: {product.price} $</Price>
          <label style={{"margin-bottom":"20px","font-weight":"Bold"}}>additional image :</label>
          <div>
            {product.img2 && <img src={product.img2} style={{"width":"200px","height":"200px","margin":"20px"}} />}

          </div>
          <br />
          <Button onClick={()=>navigate('/')}>Return to products list</Button>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
}

export default Product;
