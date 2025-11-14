import styles from './NavigationButton.module.css'

const NavigationButton = ({ navigateTo, onClick, label, style, className, children }) => {
    return (
        <>
            <a
                className = {`${styles['button-container']} ${className}`}
                onClick = {onClick}
                style = {style}
             >
                {label}
                {children}
            </a>
        </>
    )
}

export default NavigationButton