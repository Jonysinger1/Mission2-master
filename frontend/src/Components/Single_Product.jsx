import styled from "styled-components";
import { updateCartToDB } from "../apiCalls";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  align-self: center;
  padding: 20px;
  border: 2px solid balck;
  background-color: #6495ed;
  cursor: pointer;
  margin: 10px;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;




function Single_Product(props) {    
  const navigate = useNavigate()
  
  const addToCart = async () => {
    props.setfunc([...props.cart,props.product])
    alert('the product has been added to the cart')
  }


  return (
        <>
          <div style={{"align-self":"flex-start","display":"flex","flex-direction":"column","width":"30%","margin":"15px"}}>
          <h3>{props.product.title}</h3>
          <p style={{margin:7,padding:15}}>{props.product.price} $</p>
          </div>
          <div style={{"flex-direction":"row","justifyContent":"space-between"}}>
          <Button onClick={()=>navigate("/"+props.product._id)}>Details</Button>
          <Button onClick={addToCart}>Add to Cart</Button>
          </div>
          <div style={{"alignSelf":"flex-end","width":"40%"}}>
          <img src={props.product.img} style={{"width":"100px","height":"70px","alignSelf":"flex-end"}}/>
          </div>
        </>
  );
}

export default Single_Product;
