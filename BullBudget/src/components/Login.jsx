import React from 'react'
import './Login.css'
import toast from 'react-hot-toast';

function LoginPage({setLoggedIn}){
    const username= document.getElementById('username');
    const password= document.getElementById('password');

    const login = () => {
        setLoggedIn(true);
        toast.success('Logged in successfully!');   
    }
    

    return (
        <>
            <h1 id='welcome-message'>Welcome to BullBudget</h1>
            <div id='login-container'>
                
                <input id ='username' type="text" placeholder="Username" /><br/>
                <input id ='password' type="password" placeholder="Password" /><br/>
                <button id='login' onClick = {login}>Login</button><br/>
                <button id='signup'>Sign up</button>
            </div>
            
        </>
    )
}

export default LoginPage