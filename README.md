# 📝 Full-Stack Task Management App

A modern, full-stack application built with **Node.js**, **Express**, **MySQL (Sequelize)**, and **React (Vite)**.

## ⚙️ Prerequisites
- **Node.js** (v20.11+ recommended)
- **MySQL Server** (running locally or via Docker)
- **npm** (comes with Node.js)

---
## project structure
```

├── backend/
│   ├── src/
│   │   ├── config/          # Database & Sequelize setup
│   │   ├── models/          # Sequelize Table Definitions
│   │   ├── controllers/     # Business Logic
│   │   └── routes/          # API Endpoints
|   |   |__ utils/           # utility functions such as catchasync and apperror
│   └── app.js            # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Components (shadcn/ui)
│   │   ├── pages/           # Page Views (Login, Dashboard)
│   │   ├── services/        # API calls (Axios)
│   │   └── lib/             # Utils (cn, etc.)
│   └── vite.config.js       # Build config & Aliases
└── README.md
```

## 🛠️ Backend Setup (Node.js & MySQL)

1. **Navigate to backend folder:**
   ``` cd backend  ```
2. **install dependencies**
   ``` npm i  ```
3. **Initialize MySQL Database:**
Open your MySQL terminal and create the database:
 ``` CREATE DATABASE rawmart_db;  ```
4. ** Run the Backend:**
``` # Development mode (with nodemon)
npm run dev

# Standard mode
node server.js
  ```
backend api documentation:
https://orange-escape-472520.postman.co/workspace/My-Workspace~1c21cbf3-066a-4f04-87b0-76e3dc804d9a/collection/29635703-839ad3d5-1ed4-4b66-8408-09d5909f3e71?action=share&source=copy-link&creator=29635703

## 🛠️ Frontend Setup (React & tailwind)
1. Navigate to the frontend folder:
```cd frontend```
2. Install dependencies:
```npm install```
3.Run the Frontend:
```npm run dev```
