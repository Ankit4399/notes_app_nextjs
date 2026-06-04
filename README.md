# Notes App

A modern note-taking application built with Next.js, Prisma, and PostgreSQL. The application allows users to create, edit, delete, search, and organize notes by category through a clean and responsive user interface.

---

# Project Overview

Notes App is a full-stack web application designed to help users manage personal notes efficiently. Users can create notes, categorize them, search through existing notes, and update or delete notes whenever needed.

The project demonstrates the use of modern web development practices using Next.js App Router, Prisma ORM, PostgreSQL, API Routes, and responsive UI design.

---

# Tech Stack Used

## Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Lucide React Icons

## Backend

* Next.js Route Handlers (API Routes)
* Prisma ORM
* PostgreSQL

## Development Tools

* Docker (Local PostgreSQL Database)
* Prisma Studio
* ESLint

## Deployment

* Vercel
* Neon PostgreSQL

---

# Features Implemented

### Notes Management

* Create notes
* Edit notes
* Delete notes
* View all notes

### Search & Filter

* Search notes by title
* Search notes by content
* Filter notes by category

### Categories

* Personal
* Work
* Ideas
* Learning
* Todo
* Other

### User Experience

* Responsive design
* Empty state handling
* Loading state handling
* Modern landing page
* Dark themed interface

---

# How to Run Locally

## 1. Clone Repository

```bash
git clone <repository-url>
cd notes_app_nextjs
```

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notes"
```

## 4. Start PostgreSQL Database

Using Docker:

```bash
docker compose up -d
```

## 5. Generate Prisma Client

```bash
pnpm prisma generate
```

## 6. Sync Database Schema

```bash
pnpm prisma db push
```

## 7. Start Development Server

```bash
pnpm dev
```

Application will run at:

```text
http://localhost:3000
```

---

# Environment Variables Required

| Variable     | Description                           |
| ------------ | ------------------------------------- |
| DATABASE_URL | PostgreSQL database connection string |

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notes"
```

For production (Neon):

```env
DATABASE_URL="postgresql://username:password@host/neondb?sslmode=require"
```

---

# Database Setup Instructions

## Local Development

Start PostgreSQL container:

```bash
docker compose up -d
```

Push schema:

```bash
pnpm prisma db push
```

Open Prisma Studio:

```bash
pnpm prisma studio
```

---

# Database Schema

## Note Model

| Field     | Type          |
| --------- | ------------- |
| id        | String (UUID) |
| title     | String        |
| content   | String        |
| category  | String        |
| createdAt | DateTime      |
| updatedAt | DateTime      |

---

# Routes / Pages Included

## Public Pages

### Landing Page

```text
/
```

Application introduction and call-to-action.

### Notes Dashboard

```text
/notes
```

Displays all notes and note management functionality.

---

# API Routes Included

## Get All Notes

```http
GET /api/notes
```

Returns all notes.

---

## Create Note

```http
POST /api/notes
```

Creates a new note.

Request Body:

```json
{
  "title": "My Note",
  "content": "Note content",
  "category": "Learning"
}
```

---

## Get Single Note

```http
GET /api/notes/[id]
```

Returns a specific note.

---

## Update Note

```http
PUT /api/notes/[id]
```

Updates an existing note.

---

## Delete Note

```http
DELETE /api/notes/[id]
```

Deletes a note.

---

# Server Actions Used

No Server Actions are currently implemented.

The project uses:

* Client Components
* API Route Handlers
* Fetch API

for server communication.

---

# Rendering Strategies Used

## ISR (Incremental Static Regeneration)

The landing page displays note statistics fetched from PostgreSQL using Prisma.
The page uses:

export const revalidate = 60

which regenerates the page every 60 seconds, ensuring statistics remain reasonably fresh while reducing database load.

---

## SSR (Server Side Rendering)

Not currently used.

---

## SSG (Static Site Generation)

Landing page can be statically generated.

```text
/
```

---



## Client Side Rendering

Primary rendering strategy used.

Examples:

* Notes list
* Search functionality
* Category filtering
* Note CRUD operations

---

# Concepts Covered

This project demonstrates:

### Next.js

* App Router
* Route Handlers
* Client Components
* Dynamic Routes

### React

* useState
* useEffect
* useMemo
* Component Composition

### Database

* PostgreSQL
* Prisma ORM
* CRUD Operations

### API Development

* RESTful APIs
* Request Handling
* Error Handling

### UI Development

* Tailwind CSS
* Responsive Design
* Dark Theme
* Reusable Components

### Deployment

* Vercel
* Neon PostgreSQL
* Environment Variables

---

# Assumptions and Limitations

## Assumptions

* PostgreSQL database is available.
* Environment variables are configured correctly.
* User has Docker installed for local database setup.

## Limitations

* No authentication system.
* Notes are not user-specific.
* No file attachments.
* No rich text editor.
* No note sharing functionality.
* No pagination for large datasets.
* No offline support.

---

# Future Improvements

* Authentication with Auth.js
* Tags and labels
* Note sharing
* Favorites and archive
* Pagination
* Search highlighting
* Markdown support
* Real-time synchronization

---

# Author

Ankit Kumar

Built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.
