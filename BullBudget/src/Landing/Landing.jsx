import styles from './Landing.module.css';
import { useState } from 'react';
import Header from '../components/Header/Header.jsx'
import NavigationButton from '../components/NavigationButton/NavigationButton.jsx';
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
    return (
        <>
            <div
                className = {`${styles.container}`}
            >
                <Header>
                    <NavigationButton
                        onClick = {() => console.log('Button clicked')}
                    >
                        Nothing
                    </NavigationButton>
                </Header>
                <LandingContent>
                </LandingContent>
            </div>
        </>
    )
}

export default Landing