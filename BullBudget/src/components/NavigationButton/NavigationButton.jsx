import styles from './NavigationButton.module.css'

const NavigationButton = ({ navigateTo, onClick, style, className, children }) => {
    return (
        <>
            <a
                className = {`${styles['button-container']} ${className}`}
                onClick = {onClick}
                style = {style}
             >
                {children}
            </a>
        </>
    )
}

export default NavigationButton