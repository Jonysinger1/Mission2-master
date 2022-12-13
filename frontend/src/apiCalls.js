import axios from "axios";


export const getAllProducts = async () => {
    return await (await axios.get('http://localhost:3001/products/')).data
}

export const getProductById = async (id) => {
    return await (await axios.get('http://localhost:3001/products/'+id)).data
}

export const createCart = async ()=> {
    return (await axios.post('http://localhost:3001/cart/'))
}

export const updateCartToDB = async (cart) => {
    return (await axios.put('http://localhost:3001/cart/add/',cart))
}

export const updateUser = async(data)=> {
    return await (await axios.post("http://localhost:3001/user",data)).data
}

export const getCart = async (id) => {
    const res = (await axios.get('http://localhost:3001/cart/'+id))
    // console.log(res.data);
    return res
}
