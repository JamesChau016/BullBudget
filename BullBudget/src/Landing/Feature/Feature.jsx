import styles from './Feature.module.css'

const Feature = () => {
    return (
        <>
            <div
                className = {`${styles['feature-container']}`}
            >
                <h1
                    className = {`${styles['feature-headline']}`}
                >
                    Features
                </h1>
            </div>
        </>
    )
}

export default Feature