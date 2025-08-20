# 🏡 Society Management App  

A **MERN-stack web application** designed to simplify and digitize residential society operations.  
This project provides role-based logins for **Super Admin, Admins, and Residents**, making society management transparent, efficient, and user-friendly.  

---

## ✨ Features  

### 👤 Resident (User) Portal  
- Register with flat details, contact info, and residency status  
- View society notices and updates  
- Raise and track complaints  
- View and pay monthly maintenance bills (coming soon)  

### 🛠️ Admin (Society Authority) Portal  
- Manage residents and their details  
- Approve or reject complaints  
- Generate and manage maintenance bills  
- Post society-wide notices and announcements  
- Multiple admins can exist in the same society  

### 🏆 Super Admin Portal  
- Single super admin with full system access  
- Manage multiple societies  
- Assign and manage admins  
- Configure high-level system settings  

---

## ⚙️ Tech Stack  

**Frontend:**  
- React.js  
- Context API / Redux (if used)  
- TailwindCSS / Bootstrap (if used for styling)  

**Backend:**  
- Node.js  
- Express.js  
- Mongoose (ODM for MongoDB)  

**Database:**  
- MongoDB Atlas / Local MongoDB  

**Authentication & Security:**  
- JWT (JSON Web Tokens)  
- bcrypt for password hashing  

---

## 📂 Project Structure  
Society-Management-App/
│── backend/ # Express.js server & APIs
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Request handlers
│ └── server.js # Main entry point
│
│── frontend/ # React.js app
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # App pages (Login, Dashboard, etc.)
│ │ ├── context/ # State management
│ │ └── App.js
│
└── README.md # Project documentation
