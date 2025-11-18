import styles from './Hero.module.css'

const Hero = () => {
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