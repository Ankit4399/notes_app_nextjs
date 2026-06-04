# Notes App

A modern note-taking application built with **Next.js, Prisma, PostgreSQL, and Tailwind CSS**. Users can create, edit, delete, search, and organize notes by category through a responsive and intuitive interface.

## Tech Stack

### Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Prisma ORM
* PostgreSQL
* Next.js Server Actions

### Development & Deployment

* Docker (Local PostgreSQL)
* Prisma Studio
* Neon PostgreSQL
* Vercel

---

## Features

* Create notes
* Edit notes
* Delete notes
* Search notes
* Filter notes by category
* Responsive UI
* Dark theme
* Landing page with live statistics
* Server Actions for CRUD operations

---

## Running Locally

### 1. Clone Repository

```bash
git clone <repository-url>
cd notes_app_nextjs
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notes"
```

### 4. Start PostgreSQL

```bash
docker compose up -d
```

### 5. Generate Prisma Client

```bash
pnpm prisma generate
```

### 6. Sync Database

```bash
pnpm prisma db push
```

### 7. Start Development Server

```bash
pnpm dev
```

Application runs at:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| DATABASE_URL | PostgreSQL connection string |

Production example:

```env
DATABASE_URL="postgresql://username:password@host/neondb?sslmode=require"
```

---

## Database Schema

### Note

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| title     | String   |
| content   | String   |
| category  | String   |
| createdAt | DateTime |
| updatedAt | DateTime |

---

## Routes

| Route    | Description     |
| -------- | --------------- |
| `/`      | Landing Page    |
| `/notes` | Notes Dashboard |

---

## Server Actions

The application uses Server Actions instead of API routes for note mutations.

### Implemented Actions

* `createNote()`
* `updateNote()`
* `deleteNote()`

These actions:

* Interact directly with Prisma
* Update PostgreSQL records
* Trigger cache revalidation using `revalidatePath()`

---

## Rendering Strategies

### SSG

Landing page content is statically generated for better performance.

### ISR

The landing page displays note statistics using:

```ts
export const revalidate = 60;
```

This regenerates the page every 60 seconds.

### CSR

The Notes Dashboard uses Client Components for:

* Search
* Category filtering
* Modal state management
* Form interactions

---

## Concepts Covered

* Next.js App Router
* Server Actions
* ISR (Incremental Static Regeneration)
* Client Components
* Prisma ORM
* PostgreSQL
* CRUD Operations
* Tailwind CSS
* Docker
* Vercel Deployment

---

## Limitations

* No authentication
* Notes are not user-specific
* No file attachments
* No rich text editor
* No real-time updates

---

## Future Improvements

* Authentication (Auth.js)
* User-specific notes
* Tags & Labels
* Markdown support
* Note sharing
* Real-time synchronization

---

## Author

**Ankit Kumar**
