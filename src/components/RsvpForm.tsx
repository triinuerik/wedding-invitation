import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import styles from './RsvpForm.module.css'

type FormValues = {
  name: string
  email: string
  attending: 'yes' | 'no' | ''
  guests: string
  dietary: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  attending: '',
  guests: '2',
  dietary: '',
  message: '',
}

export function RsvpForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const submissionPayload = useMemo(
    () => ({
      ...values,
      submittedAt: new Date().toISOString(),
    }),
    [values]
  )

  const validate = (candidate: FormValues): FormErrors => {
    const nextErrors: FormErrors = {}
    if (!candidate.name.trim()) nextErrors.name = 'Full name is required.'
    if (!candidate.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!candidate.attending) {
      nextErrors.attending = 'Please choose whether you will attend.'
    }
    return nextErrors
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setIsSubmitted(false)
    if (Object.keys(nextErrors).length > 0) return

    // Frontend-only mode: keep payload visible for future API integration.
    // eslint-disable-next-line no-console
    console.log('RSVP submission (frontend-only):', submissionPayload)
    setIsSubmitted(true)
    setValues(initialValues)
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
            required
            placeholder="Your full name"
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            required
            placeholder="your@email.com"
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
      </div>

      <button type="button" className={styles.btnText}>
        I am additionally RSVPing on behalf of someone else
      </button>

      <div className={styles.formGroup}>
        <label>Will you be attending? *</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={values.attending === 'yes'}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  attending: event.target.value as 'yes',
                }))
              }
              required
            />
            Yes, I&apos;ll be there
          </label>
          <label>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={values.attending === 'no'}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  attending: event.target.value as 'no',
                }))
              }
            />
            Sorry, I can&apos;t make it
          </label>
        </div>
        {errors.attending && (
          <p className={styles.errorText}>{errors.attending}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="guests">Number of guests</label>
        <select
          id="guests"
          name="guests"
          value={values.guests}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, guests: event.target.value }))
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6+</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dietary">Dietary requirements</label>
        <input
          type="text"
          id="dietary"
          name="dietary"
          value={values.dietary}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, dietary: event.target.value }))
          }
          placeholder="e.g. vegetarian, allergies"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message (optional)</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="A note for the couple..."
        ></textarea>
      </div>

      <button type="submit" className={styles.submitButton}>
        Send RSVP
      </button>

      {isSubmitted && (
        <p className={styles.successText}>
          Thank you! Your RSVP was captured locally in frontend-only mode.
        </p>
      )}
    </form>
  )
}
