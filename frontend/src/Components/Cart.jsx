
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCart, updateCartToDB, updateUser } from "../apiCalls";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 15px;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 20px;
  width: 200px;
  border-radius: 10px;
  position: relative;
  text-align: center;
  align-items: center;

  &:hover {
    background-color: gray;
  }
`;

const TopTexts = styled.div`
  
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid lightgray;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  padding: 15px;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  border-radius: 10px;
  position: relative;
  text-align: center;
  align-items: center;

  &:hover {
    background-color: gray;
  }
`;




const Cart = () => {
    const navigate = useNavigate()
    const [cart,setCart] = useState({})
    const [user, setUser] = useState({})
    const params = useParams()

    const clearHandler = async () => {
        const temp = {
            _id: cart._id,
            products: [],
            totalprice: 0,
            totalamount: 0
        }
        await updateCartToDB(temp)
        window.location.reload()
    }

    const clickHandler = async()=> {
      Object.entries(user).forEach(([key,val])=> {
        if (val == null)
        {
          alert("Please enter " + key)
          return
        }
      })
      const res = await updateUser(user)
      console.log(res);
    }


    useEffect(()=> {
        const fetchData = async () => {
            console.log(params.id);
            const id = params.id
            const res = await getCart(id)
            setCart(res.data)
        }
        fetchData()
    },[])


  return (
    
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={()=>navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopButton onClick={clearHandler}>CLEAR CART</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart?.products?.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice >
                    $ {product.price}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalprice}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalprice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>First Name :</SummaryItemText>
              <input type={"text"} placeholder="enter your first name" onChange={(e)=>setUser({...user, name: e.target.value})}></input>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Last Name :</SummaryItemText>
              <input type={"text"} placeholder="enter your last name" onChange={(e)=>setUser({...user, last_name: e.target.value})}></input>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Adress :</SummaryItemText>
              <input type={"text"} placeholder="enter your adress" onChange={(e)=>setUser({...user, adress: e.target.value})}></input>
            </SummaryItem>
            <SummaryItem>
                <Button onClick={clickHandler}>
                    Pay For Order
                </Button>
            </SummaryItem>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;