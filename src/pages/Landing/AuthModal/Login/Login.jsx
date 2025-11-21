import React, { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Login.module.css'
import { useAuthModalState } from '../../AuthModalStateContext';

function Login({  }) {
    const { AuthModalState, setAuthModalState } = useAuthModalState();
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

    const handleChangeAuthModalState = (target) => {
        setAuthModalState(target)
    }
    
    return (
        <div 
            className={styles['container']}
            onClick = {(e) => e.stopPropagation()}
        >
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
                    <button type='submit' className={`${styles.btn} ${styles['btn-primary']}`}>Log In</button>
                </div>
                <p
                    className = {styles['redirect-text']}
                >
                    Not a Bull yet?
                    <a
                        className = {styles['redirect-link']}
                        onClick = {() => handleChangeAuthModalState('signup')}
                    >
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    )
}

export default Login