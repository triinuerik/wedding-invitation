import styles from './App.module.css'
import { CursorFollower } from './components/CursorFollower'
import { HeroSection } from './sections/HeroSection'
import { RsvpSection } from './sections/RsvpSection'
import { WelcomeSection } from './sections/WelcomeSection'

function App() {
  return (
    <>
      <CursorFollower />
      <HeroSection />
      <main className={styles.main}>
        <div className={styles.container}>
          <WelcomeSection />
          <RsvpSection />
          <p className={styles.footNote}>We can&apos;t wait to see you there.</p>
        </div>
      </main>
    </>
  )
}

export default App
