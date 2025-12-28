# 📝 Full-Stack Task Management App

A modern, full-stack application built with **Node.js**, **Express**, **MySQL (Sequelize)**, and **React (Vite)**.

## ⚙️ Prerequisites
- **Node.js** (v20.11+ recommended)
- **MySQL Server** (running locally or via Docker)
- **npm** (comes with Node.js)

---
## Project Structure
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
The app includes
## Login:
<img width="1920" height="1080" alt="Screenshot 2025-12-28 231316" src="https://github.com/user-attachments/assets/be2bb004-c651-4c58-bb58-405df7ffddd4" />
## Registration:
<img width="1920" height="1080" alt="Screenshot 2025-12-28 231340" src="https://github.com/user-attachments/assets/1fa25af9-70d5-4257-b14c-3f56898039f3" />
## Viewing Tasks
<img width="1920" height="1080" alt="Screenshot 2025-12-28 231603" src="https://github.com/user-attachments/assets/a2f4b572-2f3d-44d0-a352-bdec9ff3078e" />
## Adding Tasks
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c63d946b-a329-42c6-9e44-2078e387a161" />
## Editing Tasks:
<img width="1920" height="1080" alt="Screenshot 2025-12-28 231636" src="https://github.com/user-attachments/assets/24ad92b6-a8ad-49a2-8439-57f036e669e1" />
## Delete Task:
<img width="1920" height="1080" alt="Screenshot 2025-12-28 231613" src="https://github.com/user-attachments/assets/3225748e-8a0d-4189-a465-0c32e4590aeb" />




