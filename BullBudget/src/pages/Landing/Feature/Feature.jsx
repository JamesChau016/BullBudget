import styles from './Feature.module.css'
import FeatureCard from './FeatureCard/FeatureCard'

const featureList = [
    {
        name: 'Budget Tracking',
        description: 'Track your spending in real-time with detailed categorization',
    },
    {
        name: 'Financial Goals',
        description: 'Set and monitor your savings goals towards graduation',
    },
    {
        name: 'Smart Analytics',
        description: 'Get insights into your spending patterns and trends',
    },
    {
        name: 'Bill Reminders',
        description: 'Never miss a payment with automatic bill notifications',
    },
    {
        name: 'Expense Reports',
        description: 'Generate comprehensive monthly and yearly reports',
    },
    {
        name: 'Budget Planning',
        description: 'Plan your budget strategically for maximum savings',
    },
]

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
                <div
                    className = {`${styles['feature-card-container']}`}
                >
                    {featureList.map(({ name, description }) => {
                        return (
                            <FeatureCard
                                key = {name}
                                name = {name}
                                description = {description}
                            >
                            </FeatureCard>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Feature