import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import { Home, Contact, Login, Register, Reset, OrderHistory, Cart, Admin } from "./pages"
//Components
import { Header, Footer } from "./components"

// Alert toastify packages 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin/*" element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          } />

          <Route path="/productDetails/:id" element={<ProductDetails />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
