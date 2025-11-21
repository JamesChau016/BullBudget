import React, { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Login.module.css'

function Login({ setLoggedIn }) {
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
        <div className={styles['container']}>
            <h1 className={styles['welcome-message']}>Welcome to BullBudget</h1>
            <form className={styles['login-container']} onSubmit={handleLogin}>
                <div className={styles['form-group']}>
                    <input 
                        type="text"
                        className={styles['input-field']}
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                    />
                </div>
                <div className={styles['form-group']}>
                    <input 
                        type="password" 
                        className={styles['input-field']}
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                    />
                </div>
                <div className={styles['button-group']}>
                    <button type='submit' className={styles['btn-primary']}>Login</button>
                    <button type='button' className={styles['btn-secondary']}>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default Login