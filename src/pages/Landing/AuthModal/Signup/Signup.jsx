import { useAuthModalState } from '../../AuthModalStateContext';
import toast from 'react-hot-toast'
import styles from './Signup.module.css'
import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../../../firebase/firebase.js";

function Signup({  }) {
    const { AuthModalState, setAuthModalState } = useAuthModalState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');

    const showSignupError = (error) => {
        if (error.code === 'auth/email-already-in-use') {
            toast.error('This email is already in use. Please log in instead.');
        } else if (error.code === 'auth/weak-password') {
            toast.error('Password is short (minimum 6 characters).');
        }
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        else if (password !== passwordRe) {
            toast.error('Passwords do not match. Please try again.');
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            toast.success('Sign Up successful! Welcome to BullBudget.');
        }
        catch(error){
            showSignupError(error);
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
            <form className={styles['login-container']} onSubmit={handleSignup}>
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
                <div className={styles['form-group']}>
                    <input 
                        type="password" 
                        className={styles['input-field']}
                        placeholder="Enter your password again" 
                        value={passwordRe}
                        onChange={(e) => setPasswordRe(e.target.value)}
                        aria-label="Enter your password again"
                    />
                </div>
                <div className={styles['button-group']}>
                    <button type='submit' className={`${styles.btn} ${styles['btn-primary']}`}>Sign Up</button>
                </div>
                 <p
                    className = {styles['redirect-text']}
                >
                    Already a Bull?
                    <a
                        className = {styles['redirect-link']}
                        onClick = {() => handleChangeAuthModalState('login')}
                    >
                        Log In
                    </a>
                </p>
            </form>
        </div>
    )
}

export default Signup
