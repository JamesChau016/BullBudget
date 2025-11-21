import React, { useState } from 'react';
import styles from './Landing.module.css';
import Header from '../../components/Header/Header.jsx'
import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';
import Hero from './Hero/Hero.jsx';
import Feature from './Feature/Feature.jsx';
import { useNavigate } from 'react-router-dom';

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

const Landing = () => {
    const navigate = useNavigate();

    const handleLoginClicked = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <div
                className = {`${styles.container}`}
            >
                <Header>
                    <NavigationButton
                        className = {`${styles['navigation-button login-button']}`}
                        onClick = {handleLoginClicked}
                    >
                        Login
                    </NavigationButton>
                </Header>
                <LandingContent>
                </LandingContent>
            </div>
        </>
    )
}

export default Landing