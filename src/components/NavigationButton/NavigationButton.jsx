import React from 'react'
import styles from './NavigationButton.module.css'

const NavigationButton = ({ navigateTo, onClick, style, className = '', children }) => {
    const mergedClassName = `${styles['button-container']} ${className}`;
    return (
        <>
            <a
                className = {mergedClassName}
                onClick = {onClick}
                style = {style}
             >
                {children}
            </a>
        </>
    )
}

export default NavigationButton