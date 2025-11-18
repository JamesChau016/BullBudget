import styles from './Landing.module.css';
import { useState } from 'react';
import Header from '../../components/Header/Header.jsx'
import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';
import Hero from './Hero/Hero.jsx';
import Feature from './Feature/Feature.jsx';

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
    const handleLoginClicked = () => {
        console.log('Login')
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