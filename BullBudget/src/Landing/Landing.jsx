import styles from './Landing.module.css';
import { useState } from 'react';
import Header from '../components/Header'

const Landing = () => {
    return (
        <>
            <div
                className = {`${styles.container}`}
            >
                <Header></Header>
            </div>
        </>
    )
}

export default Landing