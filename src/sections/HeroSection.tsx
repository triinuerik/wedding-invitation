import styles from './HeroSection.module.css'
import backgroundImage from '../assets/images/background.jpeg'

export function HeroSection() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.heroContent}>
        <h1>Triinu & Konrad</h1>
        <h2>ARE GETTING MARRIED</h2>
      </div>
      <p className={styles.date}>24 OCTOBER 2026, 17:00</p>
      <p className={styles.location}>FOTOGRAFISKA, TALLINN</p>
    </section>
  )
}
