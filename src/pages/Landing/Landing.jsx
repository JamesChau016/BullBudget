    import React, { createContext, use, useContext, useState } from 'react';
    import styles from './Landing.module.css';
    import Header from '../../components/Header/Header.jsx'
    import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';
    import Hero from './Hero/Hero.jsx';
    import Feature from './Feature/Feature.jsx';
    import { useNavigate } from 'react-router-dom';
    import AuthModal from './AuthModal/AuthModal.jsx';
    import { AuthModalStateProvider, useAuthModalState } from './AuthModalStateContext.jsx';

    const LandingContent = () => {
        return (
            <>
                <main
                    className = {`${styles['content-container']}`}
                >
                    <Hero></Hero>
                    <Feature></Feature>
                </main>
            </>
        )
    }

    const LandingHeader = () => {
        const { setAuthModalState } = useAuthModalState();

        const handleLoginClicked = () => {
            setAuthModalState('login');
        }

        const handleSignupClicked = () => {
            setAuthModalState('signup');
        }

        return (
            <Header>
                <NavigationButton
                    className = {`${styles['navigation-button']}`}
                    onClick = {handleLoginClicked}
                >
                    Log In
                </NavigationButton>
                <NavigationButton
                    className = {`${styles['navigation-button']}`}
                    onClick = {handleSignupClicked}
                >
                    Sign Up
                </NavigationButton>
            </Header>
        )
    }

    const Landing = () => {

       
        return (
            <>
                <AuthModalStateProvider>
                    <div
                        className = {`${styles.container}`}
                    >
                        <LandingHeader>
                        </LandingHeader>
                        <LandingContent>
                        </LandingContent>
                        <AuthModal>
                        </AuthModal>
                    </div>
                </AuthModalStateProvider>
            </>
        )
    }

    export default Landing
