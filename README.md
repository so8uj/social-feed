# Social Feed Application

Welcome to the **Social Feed Application** — a modern social networking feed built with a Laravel 13 REST API backend and a React.js frontend, featuring public & private post timelines, nested comments, and a polymorphic like system.

🌐 **Live Demo:** [feed-app.watermarkbd.com](https://feed-app.watermarkbd.com)

---

## 🚀 Features

- **User Authentication** — Registration and Login powered by Laravel Sanctum (token-based).
- **Feed System** — Create text posts with optional image uploads.
- **Privacy Controls** — Posts are either **Public** (visible to all users) or **Private** (visible on the creator's own timeline only).
- **Like System** — Like/unlike any feed post or comment (toggle).
- **Comments** — Comment on any feed post.
- **Nested Replies** — Reply to any comment; self-referencing `parent_id` supports infinite depth.
- **Comment Likes** — Like individual comments independently of post likes.
- **Postman Collection** — A full API collection (`Feed-App-Collection.postman_collection.json`) is included at the project root for quick testing.
- **Database Dump** — A ready-to-import `feedapp.sql` dump is included at the project root.

---

## 🛠️ Technology Stack

### Backend

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | Laravel 13                     |
| Authentication   | Laravel Sanctum (Bearer Token) |
| Image Processing | Intervention Image             |
| Database         | MySQL           |
| ORM              | Eloquent                       |

### Frontend

| Layer            | Technology                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Framework        | React.js (Vite)                                                   |
| State Management | React Context API (`AuthContext`, `FeedContext`)                  |
| HTTP Client      | Axios                                                             |
| Routing          | React Router DOM                                                  |
| Custom Hooks     | `callApi` (base Axios wrapper), `useFeed` (full feed API control) |

---

## 🗄️ Database Schema

> 📁 A full SQL dump is included in the project root: **`feedapp.sql`**
> Import it directly into your MySQL database to get started immediately.

### `users`

| Column                      | Type            | Notes        |
| --------------------------- | --------------- | ------------ |
| `id`                        | BIGINT UNSIGNED | Primary Key  |
| `first_name`                | VARCHAR(255)    | Required     |
| `last_name`                 | VARCHAR(255)    | Nullable     |
| `email`                     | VARCHAR(255)    | Unique       |
| `password`                  | VARCHAR(255)    | Hashed       |
| `email_verified_at`         | TIMESTAMP       | Nullable     |
| `created_at` / `updated_at` | TIMESTAMP       | Auto-managed |

### `feeds`

| Column                      | Type                      | Notes                             |
| --------------------------- | ------------------------- | --------------------------------- |
| `id`                        | BIGINT UNSIGNED           | Primary Key                       |
| `user_id`                   | BIGINT UNSIGNED           | FK → `users.id` (CASCADE DELETE)  |
| `body`                      | TEXT                      | Nullable                          |
| `image`                     | VARCHAR(255)              | Nullable, path to processed image |
| `visibility`                | ENUM(`public`, `private`) | Default: `public`                 |
| `created_at` / `updated_at` | TIMESTAMP                 | Auto-managed                      |

### `feed_comments`

| Column                      | Type            | Notes                                                           |
| --------------------------- | --------------- | --------------------------------------------------------------- |
| `id`                        | BIGINT UNSIGNED | Primary Key                                                     |
| `feed_id`                   | BIGINT UNSIGNED | FK → `feeds.id` (CASCADE DELETE)                                |
| `user_id`                   | BIGINT UNSIGNED | FK → `users.id` (CASCADE DELETE)                                |
| `parent_id`                 | BIGINT UNSIGNED | FK → `feed_comments.id` (nullable, for replies, CASCADE DELETE) |
| `body`                      | TEXT            | Required                                                        |
| `created_at` / `updated_at` | TIMESTAMP       | Auto-managed                                                    |

### `feed_likes` (Polymorphic)

| Column                      | Type            | Notes                                                            |
| --------------------------- | --------------- | ---------------------------------------------------------------- |
| `id`                        | BIGINT UNSIGNED | Primary Key                                                      |
| `user_id`                   | BIGINT UNSIGNED | FK → `users.id` (CASCADE DELETE)                                 |
| `likeable_type`             | VARCHAR(255)    | Polymorphic type (`App\Models\Feed` or `App\Models\FeedComment`) |
| `likeable_id`               | BIGINT UNSIGNED | Polymorphic ID                                                   |
| `created_at` / `updated_at` | TIMESTAMP       | Auto-managed                                                     |

> **Unique Constraint:** `(user_id, likeable_id, likeable_type)` — prevents duplicate likes.

### `personal_access_tokens`

Standard Laravel Sanctum token table. Stores Bearer tokens issued on login.

---

## 🔗 Model Relationships

```
User
 ├── hasMany → Feed
 ├── hasMany → FeedComment
 └── hasMany → FeedLike

Feed
 ├── belongsTo → User
 ├── hasMany → FeedComment (top-level only, where parent_id IS NULL)
 └── morphMany → FeedLike (likeable)

FeedComment
 ├── belongsTo → Feed
 ├── belongsTo → User
 ├── belongsTo → FeedComment (parent)
 ├── hasMany → FeedComment (replies, via parent_id)
 └── morphMany → FeedLike (likeable)

FeedLike
 ├── belongsTo → User
 └── morphTo → Feed | FeedComment (likeable)
```

---

## 📮 API Reference

> 📁 Import **`Feed-App-Collection.postman_collection.json`** into Postman to test all endpoints.
> Set the `{{baseurl}}` variable to your API base (e.g., `http://localhost:8000/api/`).
> Set `{{token}}` to the Bearer token returned after login.

### Authentication (Public)

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| `POST` | `/api/registration` | Register a new user              |
| `POST` | `/api/login`        | Login and receive a Bearer token |

**Registration body (form-data):**

```
first_name, last_name, email, password, password_confirmation
```

**Login body (form-data):**

```
email, password
```

---

### Auth-Protected Endpoints

> All requests below require: `Authorization: Bearer {{token}}`

| Method   | Endpoint                        | Description                            |
| -------- | ------------------------------- | -------------------------------------- |
| `POST`   | `/api/authorize`                | Validate current token & get user info |
| `GET`    | `/api/feeds`                    | List all visible feeds                 |
| `POST`   | `/api/feeds`                    | Create a new feed post                 |
| `PUT`    | `/api/feeds/{id}`               | Update a feed post                     |
| `DELETE` | `/api/feeds/{id}`               | Delete a feed post                     |
| `POST`   | `/api/feeds/{id}/like`          | Toggle like on a feed post             |
| `POST`   | `/api/feeds/{id}/comments`      | Add a comment (or reply) to a feed     |
| `POST`   | `/api/feeds/comments/{id}/like` | Toggle like on a comment               |

**Create Feed body (multipart/form-data):**

```
body, image (file, optional), visibility (public|private)
```

**Add Comment body (form-data):**

```
body, parent_id (optional — pass to create a reply)
```

---

## 🏗️ Architecture & Design Decisions

### 1. Polymorphic Like System

A single `feed_likes` table handles likes for both posts and comments via `likeable_type` and `likeable_id`. This avoids separate `post_likes` and `comment_likes` tables and makes the system extensible (e.g., you could add likes to user profiles in the future with zero schema changes).

### 2. Self-Referencing Comments (Replies)

`FeedComment` has a nullable `parent_id` FK pointing back to itself. Top-level comments have `parent_id = NULL`. Replies point to their parent comment. This supports nested reply threads without needing a dedicated `replies` table.

### 3. Context API over Redux

At this application's scale, `AuthContext` and `FeedContext` are sufficient to share global state (auth user, feeds, loading) across all components without the boilerplate overhead of Redux.

### 4. Decoupled Custom Hooks

- **`callApi`** — A thin Axios wrapper hook that handles base HTTP requests, error propagation, and header management.
- **`useFeed`** — Consumes `callApi` and exposes semantic feed operations (`fetchFeeds`, `createFeed`, `updateFeed`, `deleteFeed`, `toggleFeedLike`, `createComment`, `toggleCommentLike`).

This layering keeps context providers clean (pure state logic) and components decoupled from raw API paths.

### 5. Auth-Reactive Feed Loading

`FeedContext` listens to the `authenticated` state from `AuthContext`. When a user logs in, feeds are automatically fetched without requiring a manual page reload. When they log out, the feed state is cleared immediately.

---

## 📦 Getting Started Locally

### Prerequisites

- PHP 8.3+, Composer
- Node.js 18+, npm
- MySQL / MariaDB

---

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure your `.env` with your database credentials:

```env
DB_DATABASE=feedapp
DB_USERNAME=root
DB_PASSWORD=
```

**Option A — Import the SQL dump directly (fastest):**

```bash
mysql -u root -p feedapp < ../feedapp.sql
```

**Option B — Run migrations:**

```bash
php artisan migrate
```

Start the dev server:

```bash
php artisan serve
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Ensure the API base URL in the Axios config points to your Laravel server (default: `http://localhost:8000/api`).

---

## 📁 Project Structure

```
social-feed-application/
├── backend/                        # Laravel 13 API
│   └── app/
│       ├── Models/
│       │   ├── User.php
│       │   ├── Feed.php
│       │   ├── FeedComment.php
│       │   └── FeedLike.php
│       └── Http/Controllers/API/
├── frontend/                       # React.js (Vite)
│   └── src/
│       ├── api/                    # Axios instance
│       ├── context/                # AuthContext, FeedContext
│       ├── hooks/                  # callApi, useFeed
│       ├── components/
│       │   ├── form/               # FormAlerts
│       │   ├── guest/              # AuthFormCard, SignInForm, SignUpForm, AuthPageLeft
│       │   └── user/               # FeedBox, Header, LeftSideBar, RightSideBar, etc.
│       ├── layouts/                # AppLayout, GuestLayout
│       ├── pages/                  # FeedPage, SigninPage, SignupPage
│       └── router/                 # AppRoutes, GuestRoutes, ProtectedRoutes
├── feedapp.sql                     # 📦 MySQL database dump
└── Feed-App-Collection.postman_collection.json   # 📮 Postman API collection
```

---

_Thank you for exploring the Social Feed Application!_
