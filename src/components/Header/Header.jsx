import React from 'react'
import styles from './Header.module.css'

const Header = ({ children }) => {
    // For Vite (and most bundlers), files placed in `public/` are served at the root URL.
    // Use an absolute path so the image resolves correctly in dev and production.
    const logoSource = '/USF_Logo.png'

    return (
        <nav className={styles.container}>
            <div className={styles['header-app-info']}>
                <img
                    src={logoSource}
                    alt="USF logo"
                    className={styles['header-usf-logo']}
                />
                <span className={styles['header-app-name']}>BullBudget</span>
            </div>
            <div className={styles['header-navigation-container']}>
                {children || 'Put your navigations here'}
            </div>
        </nav>
    )
}

export default Header

