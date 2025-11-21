import React, { useState } from 'react'
import styles from './AuthModal.module.css' 
import Login from './Login/Login'
import { useState } from 'react'

const AuthModal = ({ display }) => {
    
    const [displayMode, setDisplayMode] = useState(display);

    const renderContent = () => {
        switch(displayMode) {
            case 'login':
                return (
                    <>
                        <Login> 
                        </Login>
                    </>
                )
        }
    } 

    const handleModalClick = () => {
        setDisplayMode('none');
    }

    const displayNoneStyles = {
        display: 'none',
    }


    return (
        <>
            <div
                className = {styles.container}
                onClick = {handleModalClick}
                style = {displayMode === 'none' ? displayNoneStyles : {}}
            >
                {renderContent()}
            </div>
        </>
    )
}

export default AuthModal