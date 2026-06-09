# Task Manager — MERN Stack

Aplikacion web full-stack për menaxhimin e detyrave, ndërtuar me MERN (MongoDB, Express, React, Node.js).

## Teknologjitë

**Backend:** Node.js · Express · MongoDB · Mongoose · JWT · bcryptjs  
**Frontend:** React · React Router v6 · Redux Toolkit · Axios

---

## Struktura e Projektit

```
task-manager/
├── backend/
│   ├── controllers/
│   │   ├── authController.js   # Register & Login
│   │   └── taskController.js   # CRUD detyrave
│   ├── middleware/
│   │   └── authMiddleware.js   # Verifikimi i JWT
│   ├── models/
│   │   ├── User.js             # Modeli i përdoruesit
│   │   └── Task.js             # Modeli i detyrës
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth
│   │   └── taskRoutes.js       # /api/tasks
│   ├── .env
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Dashboard.jsx
        ├── components/
        │   └── TaskCard.jsx
        ├── redux/
        │   ├── store.js
        │   ├── authSlice.js
        │   └── taskSlice.js
        └── App.js
```

---

## Si ta nisësh

### 1. Backend

```bash
cd backend
npm install
# Krijo skedarin .env me:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/taskmanager
# JWT_SECRET=supersecretkey123
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

| Metoda | Rruga | Përshkrimi | E mbrojtur |
|--------|-------|------------|------------|
| POST | /api/auth/register | Regjistrim | Jo |
| POST | /api/auth/login | Kyçje | Jo |
| GET | /api/tasks | Merr të gjitha detyrat | Po (JWT) |
| POST | /api/tasks | Krijo detyrë | Po (JWT) |
| PUT | /api/tasks/:id | Përditëso detyrë | Po (JWT) |
| DELETE | /api/tasks/:id | Fshi detyrë | Po (JWT) |

---

## Funksionalitetet

- ✅ Regjistrim & Kyçje me JWT
- ✅ Fjalëkalim i inkriptuar me bcrypt + salt
- ✅ CRUD i plotë për detyrat
- ✅ Middleware për mbrojtje të routes
- ✅ State management me Redux Toolkit
- ✅ React Hooks (useState, useEffect)
- ✅ React Router v6 për navigim

---

*Detyrë kursi — Zhvillime Webi: Aplikime dhe Programim — UET 2025-2026*
