# TaskManagerMonolite  MS-CRUD Project

## Description

This project is a full-stack web application developed using **Laravel** for the backend and **Next.js** for the frontend. It provides a task management system with a user authentication feature using JWT (JSON Web Tokens). The application also supports file uploads and includes Swagger for API documentation.

## Features

- **User Registration and Authentication**:
  - Users can register, log in, and manage their sessions with JWT authentication.
  
- **Task Management**:
  - Users can create, update, delete, and retrieve tasks.

- **API Documentation**:
  - The API is documented using **Swagger** for easy reference and testing.

- **Frontend**:
  - The frontend is built with **Next.js** and styled with **Tailwind CSS** for a modern and responsive UI.

## Technologies Used

### Backend (Laravel)
- PHP
- Laravel 10.x
- JWT Authentication (Tymon/JWTAuth)
- Swagger (for API documentation)
- MySQL (Database)
- Mailgun (for sending emails)

### Frontend (Next.js)
- React (Next.js 13.x)
- Tailwind CSS
- Redux
- Rxjs
- Context API (for global state management)
- Axios (for API requests)
- Aos


## Database Explanation

This application uses **MySQL** as the relational database management system. Below is a high-level description of the database schema:

### Tables

1. **users**:
   - Stores user information such as:
     - `id`: Primary key.
     - `name`: The user's full name.
     - `email`: Unique email for the user.
     - `password`: Hashed password.
     - `created_at` and `updated_at`: Timestamps for tracking user creation and updates.

2. **tasks**:
   - Stores task-related information for each user:
     - `id`: Primary key.
     - `user_id`: Foreign key that references the `id` in the `users` table, linking tasks to users.
     - `title`: The title of the task.
     - `description`: Detailed description of the task.
     - `state`: Task status (e.g., pending, completed).
     - `priority`: priority.
     - `created_at` and `updated_at`: Timestamps for tracking task creation and updates.


### Relationships

- A **user** can have multiple **tasks** (one-to-many relationship).
- A **task** can have multiple **file uploads** (one-to-many relationship).

### Migrations

Migrations are used to create and manage these database tables. To run migrations, use the following command:

```bash
php artisan migrate
```
## Installation and Setup

### Prerequisites

- **PHP** (>= 8.0)
- **Composer** (for Laravel)
- **Node.js** (>= 14.x)
- **npm** or **yarn** (for Next.js)
- **MySQL** or other relational database

### Backend Setup (Laravel)

1. Clone the repository:

```bash
git clone https://github.com/estebiart/TaskManagerMonolite.git
cd mscrud
```

## Installation and Setup

### Prerequisites

### Install dependencies:

```bash
composer install
```

### Set up the environment:

```bash
php artisan key:generate
```
### Configure your .env file for database connection, JWT, and Mailgun settings.

Run the migrations to create the database tables:

```bash
php artisan migrate
```

### Install JWT and publish the configuration:

```bash
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```
### Serve the backend:

```bash
  php artisan serve
```
# Frontend Setup (Next.js)

Navigate to the frontend directory:

```bash
cd frontsm
```
## Install the dependencies:

```bash
npm install
```
Configure environment variables for API endpoints and JWT:

Create a .env.local file and define your API URLs, such as:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Run the development server:

```bash
npm run dev
```

## API Documentation
The API is documented using Swagger. Once the Laravel server is running, you can access the documentation at:

```bash
http://localhost:8000/api/documentation
```
## Routes
### Public Routes
- POST /api/register: Register a new user.
- POST /api/login: Login and receive a JWT.
Protected Routes (Require JWT)
- GET /api/tasks: Get all tasks.
- POST /api/tasks: Create a new task.
- PUT /api/tasks/{id}: Update a task.
- DELETE /api/tasks/{id}: Delete a task.


## Usage
**Authentication**: JWT-based authentication is required for accessing protected routes.
**Task Management**: Users can manage their tasks through the API.

