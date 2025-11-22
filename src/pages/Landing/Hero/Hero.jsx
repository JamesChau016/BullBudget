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
                    You all-in-one budget manager for USF students.
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
    <div className={`${styles['dashboard-preview']}`}>
        {/* Overall Stats */}
        <div className={`${styles['preview-stats']}`}>
            <div className={`${styles['stat-title']}`}>OVERALL STATS</div>
            <div className={`${styles['total-balance']}`}>
                <span className={`${styles['balance-label']}`}>Total Balance:</span>
                <span className={`${styles['balance-amount']}`}>$5,300</span>
            </div>
        </div>
        
        {/* Budget Jars */}
        <div className={`${styles['preview-jars']}`}>
            <div className={`${styles['jar-card']}`}>
                <div className={`${styles['jar-name']}`}>BullBucks</div>
                <div className={`${styles['jar-amount']}`}>$150</div>
            </div>
            <div className={`${styles['jar-card']}`}>
                <div className={`${styles['jar-name']}`}>Dining Dollars</div>
                <div className={`${styles['jar-amount']}`}>$150</div>
            </div>
            <div className={`${styles['jar-card']}`}>
                <div className={`${styles['jar-name']}`}>Tuition Fee</div>
                <div className={`${styles['jar-amount']}`}>$5,000</div>
            </div>
        </div>
        {/* Chatbox Preview */}
        <div className={`${styles['chatbox-preview']}`}>
            <div className={`${styles['chatbox-header']}`}>
                <span>🤖</span>
                <span>AI Assistant</span>
            </div>
            <div className={`${styles['chatbox-messages']}`}>
                <div className={`${styles['chat-message']}`}>
                    <div className={`${styles['message-bubble']}`}>
                        How can I help you manage your budget today?
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    )
}

export default Hero 