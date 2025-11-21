import styles from './AuthModal.module.css' 
import Login from '../../Login/Login'
import { useState } from 'react'

const AuthModal = ({ display }) => {
    
    const [displayMode, setDisplayMode] = useState(display);

    return (
        <>
            <div
                className = {styles.container}
            >
                <Login>
                </Login>
            </div>
        </>
    )
}

export default AuthModal