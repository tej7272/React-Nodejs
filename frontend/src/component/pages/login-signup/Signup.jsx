import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { toast } from 'react-toastify';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const fetchData = async (signupData) => {
        const url = "http://localhost:3500/register";
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        }

        const res = await fetch(url, options);
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', JSON.stringify(data.token));
            toast.success(data.success);
            navigate("/");

        }
        else {
            const errorData = await res.json();
            toast.error(errorData.error);
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        if(!name || !email || !password){
            setError(true);
            return false;
        }
        setError(false);

        const signupData = {
            name,
            email,
            password
        }
        fetchData(signupData);
    }

    return (
        <div className='container'>
            <div className='content-box'>
                <h1>Sign Up</h1>

                <form className='form-box' autoComplete="on">

                    <label htmlFor='name'>Name</label>
                    <input className='inputBox' id="name" type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    {error && !name &&<span className='invalid-input'>Enter vaild a name</span>}

                    <label htmlFor="email">Email</label>
                    <input className='inputBox' id="email" type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error && !email &&<span className='invalid-input'>Enter vaild a email</span>}


                    <label htmlFor="password">Password</label>
                    <input className='inputBox' id="password" type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && !password &&<span className='invalid-input'>Enter vaild a password</span>}


                    <button className='register-btn' type='button' onClick={handleSignup}>Sign up</button>
                </form>
                <div className='register-switch'>
                    <p>Already registered? <Link to="/login">Login here</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Signup;