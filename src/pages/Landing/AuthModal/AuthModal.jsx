import React, { useState } from 'react'
import styles from './AuthModal.module.css' 
import Login from './Login/Login'
import Signup from './Signup/Signup'

const AuthModal = ({ displayMode, setDisplayMode }) => {

    const renderContent = () => {
        switch(displayMode) {
            case 'login':
                return (
                    <>
                        <Login
                            setDisplayMode = {setDisplayMode}
                        > 
                        </Login>
                    </>
                )
            case 'signup':
                return (
                    <>
                        <Signup
                            setDisplayMode = {setDisplayMode}
                        >
                        </Signup>
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