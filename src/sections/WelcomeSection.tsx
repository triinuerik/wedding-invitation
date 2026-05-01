import styles from './WelcomeSection.module.css'
import kissImage from '../assets/images/kiss.jpeg'

export function WelcomeSection() {
  return (
    <section className={styles.welcome}>
      <div className={styles.panel}>
        <div className={styles.imagePane}>
          <img className={styles.photo} src={kissImage} alt="Triinu and Konrad kissing in nature" />
        </div>
        <div className={styles.content}>
          <p>Dear family and friends,</p>
          <p>
            We are so excited to invite you to our wedding party on{' '}
            <span className={styles.impact}>24.10.2026</span> taking place in the rooftop restaurant in{' '}
            <span className={styles.impact}>Fotografiska, Tallinn</span>. The party starts at{' '}
            <span className={styles.impact}>17:00</span>.
          </p>
          <p>Please let us know if you will or won&apos;t be joining us by XX.XX.XXXX using the form below.</p>
          <p>Can&apos;t wait to celebrate with you,</p>
          <p className={styles.names}>Triinu &amp; Konrad</p>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.infoPanel}`}>
        <div className={styles.content}>
          <p className={styles.heading}>Gifts and flowers</p>
          <p>
            Your presence is truly the best gift we could ask for, but if you feel called to bring a gift, please fit
            it inside an envelope. We kindly ask you to not bring flowers.
          </p>
          <p className={styles.heading}>Children</p>
          <p>We kindly ask you to leave your little ones at home in the care of a sitter.</p>
          <p className={styles.heading}>Anything we didn&apos;t cover?</p>
          <p>
            We are happy to answer to any questions you might have, feel free to reach out. On the day of the event or
            if you wish to plan a surprise, you can reach our wedding planner at +372 5555 5555 or xxx@yyy.com
          </p>
        </div>
        <div className={styles.imagePane}>
          <img className={styles.photo} src={kissImage} alt="Triinu and Konrad standing together in nature" />
        </div>
      </div>
    </section>
  )
}
