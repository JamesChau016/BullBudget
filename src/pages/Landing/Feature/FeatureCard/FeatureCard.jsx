import React from 'react'
import styles from './FeatureCard.module.css'

const FeatureCard = ({ name, description, image, className, style }) => {
    return (
        <>
            <div
                className = {`${styles['card-container']} ${className}`}
                style = {style}
            > 
                <div
                    className = {`${styles['image-container']}`}
                >
                    {image === undefined ? 'image' : image}
                </div>
                <div
                    className = {`${styles['card-content']}`}
                >
                    <h3
                        className = {`${styles['feature-name']}`}
                    >
                        {name}
                    </h3>
                    <p
                        className = {`${styles['feature-description']}`}
                    >
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default FeatureCard