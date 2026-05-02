import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import styles from './RsvpForm.module.css'

type AdditionalGuest = {
  id: string
  name: string
  email: string
}

type FormValues = {
  mainGuestName: string
  mainGuestEmail: string
  attending: 'yes' | 'no' | ''
  additionalGuests: AdditionalGuest[]
  dietary: string
  message: string
}

type FormErrors = {
  mainGuestName?: string
  mainGuestEmail?: string
  attending?: string
  additionalGuests?: Record<string, string>
}

const createAdditionalGuest = (): AdditionalGuest => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  name: '',
  email: '',
})

const initialValues: FormValues = {
  mainGuestName: '',
  mainGuestEmail: '',
  attending: '',
  additionalGuests: [],
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
    if (!candidate.mainGuestName.trim()) {
      nextErrors.mainGuestName = 'Main guest name is required.'
    }
    if (!candidate.mainGuestEmail.trim()) {
      nextErrors.mainGuestEmail = 'Email is required for the main guest.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.mainGuestEmail)) {
      nextErrors.mainGuestEmail = 'Please enter a valid email address.'
    }
    if (!candidate.attending) {
      nextErrors.attending = 'Please choose whether you will attend.'
    }
    const additionalGuestErrors = candidate.additionalGuests.reduce<
      Record<string, string>
    >((acc, guest) => {
      if (!guest.name.trim()) {
        acc[guest.id] = 'Guest name is required.'
      } else if (
        guest.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)
      ) {
        acc[guest.id] = 'Please enter a valid guest email address.'
      }
      return acc
    }, {})
    if (Object.keys(additionalGuestErrors).length > 0) {
      nextErrors.additionalGuests = additionalGuestErrors
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

  const addGuest = () => {
    setValues((prev) => ({
      ...prev,
      additionalGuests: [...prev.additionalGuests, createAdditionalGuest()],
    }))
  }

  const updateGuest = (
    id: string,
    key: keyof Pick<AdditionalGuest, 'name' | 'email'>,
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      additionalGuests: prev.additionalGuests.map((guest) =>
        guest.id === id ? { ...guest, [key]: value } : guest
      ),
    }))
  }

  const removeGuest = (id: string) => {
    setValues((prev) => ({
      ...prev,
      additionalGuests: prev.additionalGuests.filter((guest) => guest.id !== id),
    }))
    setErrors((prev) => {
      if (!prev.additionalGuests || !prev.additionalGuests[id]) {
        return prev
      }
      const nextAdditionalGuestErrors = { ...prev.additionalGuests }
      delete nextAdditionalGuestErrors[id]
      return {
        ...prev,
        additionalGuests:
          Object.keys(nextAdditionalGuestErrors).length > 0
            ? nextAdditionalGuestErrors
            : undefined,
      }
    })
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="mainGuestName">Full name *</label>
          <input
            type="text"
            id="mainGuestName"
            name="mainGuestName"
            value={values.mainGuestName}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                mainGuestName: event.target.value,
              }))
            }
            required
            placeholder="Your full name"
          />
          {errors.mainGuestName && (
            <p className={styles.errorText}>{errors.mainGuestName}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mainGuestEmail">Email *</label>
          <input
            type="email"
            id="mainGuestEmail"
            name="mainGuestEmail"
            value={values.mainGuestEmail}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                mainGuestEmail: event.target.value,
              }))
            }
            required
            placeholder="your@email.com"
          />
          {errors.mainGuestEmail && (
            <p className={styles.errorText}>{errors.mainGuestEmail}</p>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        {values.additionalGuests.map((guest, index) => (
          <div className={styles.guestRow} key={guest.id}>
            <div className={styles.guestRowMain}>
              <div className={styles.guestField}>
                <label htmlFor={`guest-${guest.id}`}>+{index + 1} full name *</label>
                <input
                  type="text"
                  id={`guest-${guest.id}`}
                  name={`guest-${guest.id}`}
                  value={guest.name}
                  onChange={(event) =>
                    updateGuest(guest.id, 'name', event.target.value)
                  }
                  required
                  placeholder="Full name"
                />
              </div>
              <div className={styles.guestField}>
                <label htmlFor={`guest-email-${guest.id}`}>
                  +{index + 1} email
                </label>
                <input
                  type="email"
                  id={`guest-email-${guest.id}`}
                  name={`guest-email-${guest.id}`}
                  className={styles.guestEmailInput}
                  value={guest.email}
                  onChange={(event) =>
                    updateGuest(guest.id, 'email', event.target.value)
                  }
                  placeholder="Email (optional)"
                />
              </div>
              <div className={styles.guestField}>
                <label> </label>
              <button
                type="button"
                className={styles.removeGuestButton}
                onClick={() => removeGuest(guest.id)}
              >
                Remove
              </button>
              </div>

            </div>
            {errors.additionalGuests?.[guest.id] && (
              <p className={styles.errorText}>
                {errors.additionalGuests[guest.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button type="button" className={styles.btnText} onClick={addGuest}>
        Add another guest
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
