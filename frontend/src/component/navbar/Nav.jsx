import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import Logo from '../../asset/logoImg.jpg';
import { toast } from 'react-toastify';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success("User logout successfully");
        navigate('/login');
    }


    return (
        <div className='nav'>
            <div className='nav-box'>
                <img alt='web logo' src={Logo} className='nav-image' />
                {auth ?
                    <ul className='nav-ul'>
                        <li><Link to="/">Product</Link> </li>
                        <li><Link to="/add">Add Product</Link> </li>
                        <li><Link to="/profile">Profile</Link> </li>
                        <li> <Link onClick={handleLogout} to="/login">Logout</Link> </li>
                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default Nav;