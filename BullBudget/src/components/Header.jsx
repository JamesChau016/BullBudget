import styles from './Header.module.css'

const Header = ({ children }) => {
    return (
        <>
            <nav
                className = {`${styles.container}`}
            >
                <div 
                    className = {`${styles['header-app-info']}`}
                >
                    <img
                        src = "public/USF_Logo.png"
                        className = {`${styles['header-usf-logo']}`}
                    ></img>
                    <span
                        className = {`${styles['header-app-name']}`} 
                    >
                        BullBudget
                    </span>
                </div>
                <div
                    className = {`${styles['header-navigation-container']}`}
                >
                    {children || 'Put your navigations here'}
                </div>
            </nav>
        </>
    ) 
}

export default Header