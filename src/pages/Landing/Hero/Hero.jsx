import React from 'react'
import styles from './Hero.module.css'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import { useNavigate } from 'react-router-dom'
import { useAuthModalState } from '../AuthModalStateContext'

const Hero = () => {
    const { AuthModalState, setAuthModalState } = useAuthModalState();
    const navigate = useNavigate();

    const handleStartClicked = () => {
        setAuthModalState('signup');
    }

    return (
        <div
            className = {`${styles['hero-container']}`}
        >
            <div
                className = {`${styles['hero-headlines']}`}
            >
                <h1
                    className = {`${styles['hero-headline']}`}
                >
                    Your all-in-one budget manager
                </h1>
                <h3
                    className = {`${styles['hero-subheadline']}`}
                >
                    Start managing your budgets towards graduation from today.
                </h3>
                <button
                    className = {`${styles['action-button']}`}
                    onClick = {handleStartClicked}
                >
                    Start Now
                </button>
            </div>
            <div
                className = {`${styles['hero-image-container']}`}
            >
                This is the image container.
            </div>
        </div>
    )
}

export default Hero 