import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import App from "./pages/App";
import Product from "./pages/Product.jsx";
import Cart from "./Components/Cart";

const RouterApp = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path=":id" element={<Product />} />    
        <Route path="/cart/:id" element={<Cart />} />        
      </Routes>
    </Router>
  );
};

export default RouterApp;
