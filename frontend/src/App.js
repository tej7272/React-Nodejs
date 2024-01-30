
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './component/navbar/Nav';
import Product from './component/pages/product/Product'
import AddProduct from './component/pages/addProduct/AddProduct'
import Profile from './component/pages/profile/Profile';
import UpdateProduct from './component/pages/updateProduct/UpdateProduct';
import Footer from './component/footer/Footer';
import Login from './component/pages/login-signup/Login';
import Signup from './component/pages/login-signup/Signup';
import PrivateRoute from './component/pages/login-signup/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer position="top-center"/>
        <Nav />
        <Routes>

          <Route exact element={<PrivateRoute />}>
          <Route exact path='/' element={<Product />} />
          <Route exact path='/add' element={<AddProduct />} />
          <Route exact path='/update/:id' element={<UpdateProduct />} />
          <Route exact path='/profile' element={<Profile />} />
          </Route>
          
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
