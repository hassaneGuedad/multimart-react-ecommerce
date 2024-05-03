import { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button }  from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatbotModal from "./components/chatbot/chatbotmodal";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const handleChatOpen = () => setChatbotOpen(true);
  const handleChatClose = () => setChatbotOpen(false);
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        <Button variant="contained" onClick={handleChatOpen} sx={chatButtonStyle} startIcon={<ChatIcon />}>Chat with me !</Button>
        <ChatbotModal open={chatbotOpen} handleClose={handleChatClose} />
      </Router>
    </Suspense>
  );
}

const chatButtonStyle = {
  textTransform: "uppercase",
  position: "fixed",
  bottom: "0px",
  right: "10px",
  color: "white",
  backgroundColor: "#000000",
  borderRadius: "10px 10px 0 0",
  padding: "10px",
};

export default App;
