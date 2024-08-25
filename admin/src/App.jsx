import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/AddProduct';
import AllProducts from './pages/AllProducts';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {

  const url = "http://localhost:4000";
  return (
    <BrowserRouter>
    <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/add" element={<AddProduct url={url} />} />
            <Route path="/list" element={<AllProducts url={url} />} />
            <Route path="/order" element={<Order url={url}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
