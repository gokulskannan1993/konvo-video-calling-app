


# 🎥 Konvo Video Calling App — MERN Stack

Konvo is a full-stack real-time communication platform that offers both chat and video calling functionalities. Built with the MERN stack, it provides features like 1-on-1 and group video calls, screen sharing, message reactions, and more.([GitHub][1])

## 🌐 Live Demo

Experience the application here: [konvo-video-calling-app.onrender.com](https://konvo-video-calling-app.onrender.com)

## 🚀 Features

* Real-time messaging with typing indicators and reactions.
* 1-on-1 and group video calls with screen sharing and recording capabilities.
* JWT authentication and protected routes.
* Language exchange platform with 32 unique UI themes.
* Global state management using Zustand.
* Error handling on both frontend and backend.
* Built with scalable technologies like Stream.
* Free deployment.

## 🛠️ Tech Stack

* **Frontend**:

  * React.js
  * Tailwind CSS
  * TanStack Query
  * Zustand (state management)
    
* **Backend**:

  * Node.js
  * Express.js
  * MongoDB
  * JWT for authentication

* **Third-party Services**:

  * Stream API for chat functionalities

## 📁 Project Structure

* `api/`: Contains the backend code, including API routes and database models.
* `ui/`: Contains the frontend code, built with React.

## ⚙️ Environment Variables

Create a `.env` file in both the `api` and `ui` directories with the following content:

### Backend (`/api`)

```env
PORT=5001
MONGO_URI=your_mongo_uri
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```



### Frontend (`/ui`)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```



Replace the placeholder values with your actual credentials.

## 🧪 Getting Started

### Backend Setup

1. Navigate to the `api` directory:

   ```bash
   cd api
   ```



2. Install dependencies:

   ```bash
   npm install
   ```



3. Start the backend server:

   ```bash
   npm run dev
   ```



### Frontend Setup

1. Navigate to the `ui` directory:

   ```bash
   cd ui
   ```



2. Install dependencies:

   ```bash
   npm install
   ```



3. Start the frontend development server:

   ```bash
   npm run dev
   ```




---

