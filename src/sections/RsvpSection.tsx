import { RsvpForm } from '../components/RsvpForm'
import styles from './RsvpSection.module.css'

export function RsvpSection() {
  return (
    <section className={styles.rsvpSection}>
      <h2>RSVP</h2>
      <p className={styles.rsvpIntro}>
        Please let us know if you will be able to join us.
      </p>
      <RsvpForm />
    </section>
  )
}
