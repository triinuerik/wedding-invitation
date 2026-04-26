import styles from './WelcomeSection.module.css'

export function WelcomeSection() {
  return (
    <section className={styles.welcome}>
      <p>Dear friends and family,</p>
      <p>
        We are delighted to invite you to share in the joy of our wedding as we
        begin our journey together as husband and wife.
      </p>
      <p className={styles.names}>Triinu and Konrad</p>
      <div className={styles.divider}></div>
      <p>
        We would be honoured by your presence and look forward to celebrating
        this special day with you.
      </p>
    </section>
  )
}
