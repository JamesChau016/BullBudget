import React, { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Login.module.css'
import { useAuthModalState } from '../../AuthModalStateContext';
import { auth } from "../../../../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login({ setLoggedIn }) {
    const { setAuthModalState } = useAuthModalState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showLoginError = (error) => {
        if (error.code === 'auth/user-not-found') {
            toast.error('No user found with this email. Please sign up first.');
        } else if (error.code === 'auth/wrong-password') {
            toast.error('Incorrect password. Please try again.');
        } else if (error.code === 'auth/invalid-email') {
            toast.error('Please enter a valid email address.');
        } else if (error.code === 'auth/invalid-credential') {
            toast.error('Invalid credentials provided. Please try again.');
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            toast.success('Login successful! Welcome back to BullBudget.');
        }
        catch(error){
            console.log(error);
            showLoginError(error);
            return;
        }
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