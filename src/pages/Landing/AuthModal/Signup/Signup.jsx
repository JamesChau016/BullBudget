import { useAuthModalState } from '../../AuthModalStateContext';
import toast from 'react-hot-toast'
import styles from './Signup.module.css'
import { useState } from 'react';
import { useUser } from '../../../../backend/user/useUser';
import { useNavigate } from 'react-router-dom';

function Signup({  }) {
    const { AuthModalState, setAuthModalState } = useAuthModalState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const navigate = useNavigate();
    const { signUp, loading } = useUser();

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await signUp(email, password, passwordRe);
        
        if (result.success) {
            navigate("/dashboard");
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
