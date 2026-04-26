import styles from './HeroSection.module.css'
import backgroundImage from '../assets/images/background.jpg'

export function HeroSection() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.heroContent}>
        <h1>We&apos;re Getting Married!</h1>
        <p className={styles.subtitle}>You&apos;re invited to celebrate with us</p>
      </div>
    </section>
  )
}
