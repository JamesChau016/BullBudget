<<<<<<< HEAD
import styles from './Signup.module.css'

const Signup = () => {

}

=======
import { useAuthModalState } from '../../AuthModalStateContext';
import toast from 'react-hot-toast'
import styles from './Signup.module.css'
import { useState } from 'react';

function Signup({  }) {
    const { AuthModalState, setAuthModalState } = useAuthModalState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
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

>>>>>>> a7ebee62f29bd190468cb5c71f8aec18ed5256db
