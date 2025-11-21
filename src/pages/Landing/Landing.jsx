import styles from './Landing.module.css';
import { useState } from 'react';
import Header from '../../components/Header/Header.jsx'
import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';
import Hero from './Hero/Hero.jsx';
import Feature from './Feature/Feature.jsx';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal/AuthModal.jsx';

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

    const [AuthModalState, setAuthModalState] = useState('none');

    const navigate = useNavigate();

    const handleLoginClicked = () => {
        setAuthModalState('login');
    }

    return (
        <>
            <div
                className = {`${styles.container}`}
            >
                <Header>
                    <NavigationButton
                        className = {`${styles['navigation-button']}`}
                        onClick = {handleLoginClicked}
                    >
                        Login
                    </NavigationButton>
                    <NavigationButton
                    >
                    </NavigationButton>
                </Header>
                <LandingContent>
                </LandingContent>
                <AuthModal
                    displayMode = {AuthModalState}
                    setDisplayMode = {setAuthModalState}
                >
                </AuthModal>
            </div>
        </>
    )
}

export default Landing