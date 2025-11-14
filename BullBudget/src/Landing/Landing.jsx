import styles from './Landing.module.css';
import { useState } from 'react';
import Header from '../components/Header/Header.jsx'
import NavigationButton from '../components/NavigationButton/NavigationButton.jsx';

const Landing = () => {
    return (
        <>
            <div
                className = {`${styles.container}`}
            >
                <Header>
                    <NavigationButton
                        label = "nothing"
                        onClick = {() => console.log('Button clicked')}
                    >

                    </NavigationButton>
                </Header>
            </div>
        </>
    )
}

export default Landing