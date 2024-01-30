import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })


    const fetchData = async (loginData) => {
        const url = "http://localhost:3500/login";
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }

        const res = await fetch(url, options);
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', JSON.stringify(data.token));
            toast.success(data.success);
            navigate('/');
        }
        else {
            const errorData = await res.json();
            toast.error(errorData.error);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if(!email || !password){
            setError(true);
            return false;
        }
        setError(false);

        const loginData = {
            email,
            password
        }
        fetchData(loginData);
        setEmail("");
        setPassword("");
    }

    return (
        <div>

            <div className='content-box'>
                <h1>Login</h1>

                <form className='form-box' autoComplete="on">

                    <label htmlFor="email">Email</label>
                    <input className='inputBox' id="email" type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error && !email &&<span className='invalid-input'>Enter vaild a email</span>}


                    <label htmlFor="password">Password</label>
                    <input className='inputBox' id="password" type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && !password &&<span className='invalid-input'>Enter vaild a password</span>}


                    <button className='register-btn' onClick={handleLogin}>Login</button>
                </form>
                <div className='register-switch'>
                    <p>don't have account? <Link to="/signup">Signup here</Link> </p>
                </div>

            </div>

        </div>
    )
}

export default Login;
