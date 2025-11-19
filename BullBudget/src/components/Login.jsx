import React from 'react'
import './Login.css'

function LoginPage(){
    return (
        <>
            <h1>Welcome to BullBudget</h1>
            <input type="text" placeholder="Username" /><br/>
            <input type="password" placeholder="Password" /><br/>
            <button>Login</button><br/>
            <button>Sign up</button>
        </>
    )
}

export default LoginPage