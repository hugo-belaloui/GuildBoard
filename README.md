# Guildboard

A lightweight web app for conscientious Guild Masters who want to track their adventurers and quests in a reliable, centralized way.

## 1. Project and team

Guildboard lets a Guild Master:
- create quests and adventurers, and browse/filter them,
- assign an adventurer to a quest (with level and availability checks),
- complete a quest, rewarding the adventurer with gold/XP and handling level-ups automatically.

The team : 

- **Hugo Belaloui** — referent on the front-end week.
- **Nelson Grac-Aubert** — referent on the back-end week.

## 2. Prerequisites and setup

You will need:
- Java 21+
- Maven (or use the wrapper included in `backend/`, no local install needed)
- PostgreSQL 16
- Node.js 18+ and npm

### Database

Create a local PostgreSQL database named `guildboard`, reachable on `localhost:5432`.

In `backend/`, copy `.env.example` to `.env` and fill in your own credentials:

```
DB_URL=jdbc:postgresql://localhost:5432/guildboard
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

### Backend

```
cd backend
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`. Demo data (adventurers and quests, in every status) is seeded automatically on first launch.

### Frontend

```
cd frontend
npm install
npm run dev
```

The app opens on `http://localhost:5173`.

## 3. API documentation

Swagger UI: `http://localhost:8080/swagger-ui/index.html`

Main endpoint groups:
- `/api/adventurers` — CRUD, plus `/history` for an adventurer's past and current quests.
- `/api/quests` — CRUD (filterable by `status` and `difficulty`), plus `/assignment` and `/completion` for the guild's core actions.

## 4. Technical choices and difficulties

- **Backend**: Spring Boot with a strict layered architecture (Controller / Service / Repository), Bean Validation on every request DTO, and a centralized `@RestControllerAdvice` so every error (validation, business rule, unexpected) comes back in the same `{status, code, message}` shape.
- **Frontend**: React with TypeScript in strict mode, a feature-based folder structure (`types` / `services` / `hooks` / `components` / `pages`), React Router for navigation, Tailwind for styling. No external state library — `useState`/`useEffect` and a handful of small custom hooks were enough for this scope.
- **PostgreSQL**, even if it's more than this project strictly needs, to practice with a database engine actually used in the industry.
- The trickiest part was getting the front and back error contracts to agree at the same time: the front was built around a `{status, code, message}` response before the back's `GlobalExceptionHandler` existed, so early on, a bad request came back as a raw 500 instead of a clean 400/422.
- Keeping the Figma design, the UML and the actual code in sync took real discipline : several details (the required level missing from a screen, assignment shown as checkboxes when only one adventurer can ever be picked) only surfaced by comparing the two side by side, not by reading the subject alone.

## 5. Bonus

**None implemented yet.**

- A shop to spend gold on equipment, weapons, armor and trinkets. 
- A Dashboard to visualize stats about your guild. 
- A simple and secure auth feature.


