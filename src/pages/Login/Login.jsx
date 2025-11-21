import React, { useState } from 'react'
import './Login.css'
import toast from 'react-hot-toast';

function LoginPage({setLoggedIn}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoggedIn(true);
        toast.success('Logged in successfully!');   
    }
    
    return (
        <div className='container'>
            <h1 className='welcome-message'>Welcome to BullBudget</h1>
            <form className='login-container' onSubmit={handleLogin}>
                <div className='form-group'>
                    <input 
                        type="text"
                        className='input-field'
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type="password" 
                        className='input-field'
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                    />
                </div>
                <div className='button-group'>
                    <button type='submit' className='btn btn-primary'>Login</button>
                    <button type='button' className='btn btn-secondary'>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage