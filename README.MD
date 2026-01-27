# 📝 Todoify

<div align="center">

![Todoify Logo](./client/public/Todoify.png)

**A modern, minimalist task management app built with the MERN stack**

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-blue)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

*Plan, execute, and finish tasks in a clean and motivating environment*

[Live Demo](#) • [Documentation](#) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 🌟 About Todoify

**Todoify** is a productivity-focused task management web application inspired by Todoist, with an emphasis on simplicity, speed, and motivation. Built as a production-level fullstack MERN project, Todoify helps users organize their daily tasks, projects, and goals in an intuitive interface.

### ✨ Why Todoify?

- **🎯 Simplicity First** - Clean UI without overwhelming features
- **⚡ Lightning Fast** - Optimized for speed and responsiveness
- **🎨 Beautiful Design** - Modern interface with shadcn/ui components
- **📱 Fully Responsive** - Works seamlessly on all devices
- **🔒 Secure** - JWT-based authentication with bcrypt encryption
- **🚀 Scalable** - Production-ready architecture

---

## 🎯 Target Users

- 👨‍🎓 **Students** - Managing study schedules and assignment deadlines
- 💼 **Professionals** - Organizing daily workload and projects
- 🎨 **Freelancers** - Tracking multiple client projects and priorities

---

## ✨ Key Features

### 🔐 Authentication
- [x] User registration with secure password hashing
- [x] JWT-based login & session management
- [x] Secure logout functionality
- [ ] Password recovery (Coming in v2)

### 📋 Task Management
- [x] Create, update, and delete tasks
- [x] Mark tasks as complete/incomplete
- [x] Add descriptions and set priorities (Low/Medium/High)
- [x] Set due dates
- [ ] Subtasks (v2)
- [ ] Recurring tasks (v2)

### 📁 Projects
- [x] Create and organize projects
- [x] Assign tasks to specific projects
- [x] Rename and delete projects
- [x] Color-coded project organization

### 🏷️ Labels & Tags
- [x] Create custom labels (e.g., Work, Study, Personal)
- [x] Assign multiple labels to tasks
- [x] Filter tasks by labels
- [x] Color-coded label system

### 📊 Smart Views
- [x] **Inbox** - All unorganized tasks
- [x] **Today** - Tasks due today
- [x] **Upcoming** - Future scheduled tasks
- [x] **Completed** - Task history
- [x] **Project View** - Tasks organized by projects

### 🔍 Search & Filter
- [x] Search tasks by name
- [x] Filter by project, label, or priority
- [x] Date-based filtering

### 🎨 UI/UX
- [x] Todoist-inspired sidebar navigation
- [x] Fully responsive design
- [x] Toast notifications for actions
- [x] Modal-based task creation
- [ ] Dark mode (v2)
- [ ] Drag & drop ordering (v2)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2 + Vite
- **Styling:** Tailwind CSS 4.1
- **UI Components:** shadcn/ui + Radix UI
- **State Management:** Zustand / Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Validation:** Zod / Joi
- **Security:** Rate limiting, input sanitization

### DevOps & Deployment
- **Version Control:** Git + GitHub
- **API Testing:** Postman
- **Frontend Hosting:** Vercel / Render
- **Backend Hosting:** Render / Railway
- **Database Hosting:** MongoDB Atlas

---

## 📁 Project Structure

```
Todoify/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   └── Header.jsx
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API service layer
│   │   ├── store/        # State management
│   │   ├── utils/        # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todoify.git
   cd todoify
   ```

2. **Install dependencies**

   Frontend:
   ```bash
   cd client
   npm install
   ```

   Backend:
   ```bash
   cd server
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `server` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   
   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:5173
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Run the application**

   Backend (from `server` directory):
   ```bash
   npm run dev
   ```

   Frontend (from `client` directory):
   ```bash
   npm run dev
   ```

5. **Access the app**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api/v1`

---

## 📡 API Documentation

### Standard Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/me` | Get current user |
| POST | `/api/v1/auth/logout` | Logout user |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/tasks` | Create new task |
| GET | `/api/v1/tasks?view=inbox\|today\|upcoming` | Get tasks with filters |
| GET | `/api/v1/tasks/:id` | Get single task |
| PUT | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |
| PATCH | `/api/v1/tasks/:id/toggle` | Toggle task completion |

### Project Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/projects` | Create project |
| GET | `/api/v1/projects` | Get all user projects |
| PUT | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |

### Label Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/labels` | Create label |
| GET | `/api/v1/labels` | Get all user labels |
| PUT | `/api/v1/labels/:id` | Update label |
| DELETE | `/api/v1/labels/:id` | Delete label |

---

## 📊 Data Models

### Task Schema

```javascript
{
  title: String (required),
  description: String,
  dueDate: Date,
  priority: "low" | "medium" | "high",
  status: "pending" | "completed",
  projectId: ObjectId,
  labels: [ObjectId],
  userId: ObjectId (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Schema

```javascript
{
  name: String (required),
  color: String,
  icon: String,
  userId: ObjectId (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Label Schema

```javascript
{
  name: String (required),
  color: String,
  userId: ObjectId (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Screenshots

> *Coming soon - Add screenshots of your application here*

---

## 🗺️ Roadmap

### ✅ Phase 1 - MVP (Current)
- [x] Authentication system
- [x] Task CRUD operations
- [x] Project management
- [x] Label system
- [x] Smart views (Inbox, Today, Upcoming)
- [x] Search & filtering
- [x] Responsive UI

### 🚧 Phase 2 - Enhanced Features
- [ ] Subtasks
- [ ] Task reminders
- [ ] Recurring tasks
- [ ] Drag & drop task ordering
- [ ] Dark mode
- [ ] Task notes
- [ ] Activity history

### 🔮 Phase 3 - Gamification & Social
- [ ] Productivity streaks
- [ ] XP/Achievement system
- [ ] Task templates
- [ ] Export/import tasks
- [ ] Collaboration features

### 🌟 Future Considerations
- Mobile app (React Native)
- Calendar integration
- Premium features
- Team workspaces
- AI task planning

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Inspired by [Todoist](https://todoist.com)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Design inspiration from modern productivity apps

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and lots of ☕

</div>