# TaskFlow API & Dashboard

A scalable, full-stack Task Management application built with Node.js, Express, MongoDB, and React. It features a robust REST API with Role-Based Access Control (RBAC) and a beautiful, dynamic frontend dashboard designed with glassmorphism aesthetics.

## 🚀 Features

### Backend (Node.js / Express)
* **RESTful API Design**: Clean, versioned routes (`/api/v1/`).
* **Authentication**: Secure user registration and login using `bcryptjs` for password hashing and `jsonwebtoken` for stateless authentication.
* **Role-Based Access Control (RBAC)**: Distinct permissions for `user` and `admin` roles. Admins can view system-wide tasks.
* **Database**: MongoDB integration using Mongoose models (Users & Tasks).
* **Modern JS**: Fully written using ES Modules (`import`/`export`).
* **Validation**: Request body validation using `Joi`.
* **API Documentation**: Pre-configured Postman Collection included.

### Frontend (React / Vite)
* **Dynamic Design**: Beautiful, responsive UI featuring glassmorphism, modern typography, and smooth micro-animations.
* **Routing**: Protected routes using `react-router-dom` to ensure only authenticated users can access the dashboard.
* **API Integration**: Connects to the backend seamlessly using `axios`.
* **State Management**: Local component state handling for real-time UI updates during CRUD operations.

---

## 🛠️ Tech Stack

**Frontend:**
* React (via Vite)
* Axios
* React Router DOM
* Lucide React (Icons)
* Vanilla CSS (Glassmorphism & Gradients)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* bcryptjs
* Joi (Validation)

---

## 💻 Getting Started

### Prerequisites
* Node.js installed
* MongoDB (Local or Atlas)

### 1. Setup the Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables. Create or edit the `.env` file in the `Backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=1d
   ```
4. Start the server (Dev Mode):
   ```bash
   npm run dev
   ```

### 2. Setup the Frontend
1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port provided by Vite).

---

## 🔗 API Endpoints Overview

Import the `Backend/postman_collection.json` into Postman for full interactive documentation.

**Auth Routes (`/api/v1/auth`)**
* `POST /register` - Register a new user
* `POST /login` - Login and receive JWT
* `GET /me` - Get current authenticated user details

**Task Routes (`/api/v1/tasks`)**
* `POST /` - Create a new task
* `GET /` - Get all tasks for logged-in user
* `GET /:id` - Get a specific task
* `PUT /:id` - Update a specific task
* `DELETE /:id` - Delete a specific task
* `GET /all` - Get all tasks in the system (**Admin Only**)

---

## 📈 Scalability

For details on how this monolithic architecture can be scaled horizontally, optimized with caching (Redis), and eventually evolved into microservices, please see the `Backend/SCALABILITY.md` file.
