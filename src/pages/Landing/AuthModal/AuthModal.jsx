import React, { useContext, useState } from 'react'
import styles from './AuthModal.module.css' 
import Login from './Login/Login'
import Signup from './Signup/Signup'
import { useAuthModalState } from '../AuthModalStateContext'

const AuthModal = () => {

    const { AuthModalState, setAuthModalState } = useAuthModalState();

    const renderContent = () => {
        switch(AuthModalState) {
            case 'login':
                return (
                    <>
                        <Login
                        ></Login>
                    </>
                )
            case 'signup':
                return (
                    <>
                        <Signup
                        ></Signup>
                    </>
                )
        }
    } 

    const handleModalClick = () => {
        setAuthModalState('none');
    }

    const AuthModalStateNoneStyles = {
        display: 'none',
    }


    return (
        <>
            <div
                className = {styles.container}
                onClick = {handleModalClick}
                style = {AuthModalState === 'none' ? AuthModalStateNoneStyles : {}}
            >
                {renderContent()}
            </div>
        </>
    )
}

export default AuthModal