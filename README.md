# Wedding Invitation (React + TypeScript + Vite)

This project is the React migration of the original static wedding invitation page.

## Current Scope (Implemented)

- Componentized page layout (`HeroSection`, `WelcomeSection`, `RsvpSection`, `RsvpForm`, `CursorFollower`)
- CSS Modules for component styling, with minimal global styles in `src/index.css`
- Cursor follower animation with smooth orbit behavior around the cursor
- RSVP form as controlled React state with basic client-side validation
- Frontend-only submission flow (payload logged to console)

## Run Locally

- `npm install`
- `npm run dev`
- `npm run build`

## Deferred Backend Phase (Planned, Not Implemented Yet)

The following items are intentionally deferred to a separate implementation task:

- Add RSVP API endpoint (`POST /api/rsvp`)
- Persist submissions in a database
- Send email notifications on each RSVP
- Add production handling for retries, secrets, and abuse protection

When backend work starts, the frontend submit handler in `RsvpForm` should be switched from local logging to API calls while preserving existing validation and UI states.
