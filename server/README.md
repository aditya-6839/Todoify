# Todoify Backend API

A RESTful API for the Todoify application built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── todoController.js     # Todo CRUD operations
│   └── labelController.js    # Label CRUD operations
│   └── projectController.js  # Project CRUD operations
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Global error handler
├── models/
│   ├── User.js              # User schema
│   ├── Todo.js              # Todo schema
│   ├── Label.js             # Label schema
│   └── Project.js           # Project schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── todoRoutes.js        # Todo endpoints
│   ├── labelRoutes.js       # Label endpoints
│   └── projectRoutes.js     # Project endpoints
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── server.js                # Main application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoify
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. Make sure MongoDB is running:
   - For local MongoDB: Start the MongoDB service
   - For MongoDB Atlas: Use the connection string from your cluster

5. Start the server:

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server should now be running on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register a new user
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /api/auth/logout
```

#### Get current user
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Todo Routes (`/api/todos`)

All todo routes require authentication (JWT token).

#### Get all todos (with Advanced Filtering)
```http
GET /api/todos?search=work&priority=high&status=pending
Authorization: Bearer <token>
```
**Query Parameters:**
- `search`: Search text in title or description
- `priority`: Filter by 'low', 'medium', 'high'
- `status`: Filter by 'completed', 'pending'
- `project`: Filter by project ID
- `labels`: Filter by comma-separated label IDs
- `sort`: Sort field (e.g. 'dueDate', '-createdAt')

#### Get single todo
```http
GET /api/todos/:id
Authorization: Bearer <token>
```

#### Create a new todo
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the Todoify app",
  "priority": "high",
  "dueDate": "2026-02-01",
  "project": "project_id_optional",
  "labels": ["label_id_1", "label_id_2"]
}
```

#### Update a todo
```http
PUT /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

#### Toggle todo completion
```http
PATCH /api/todos/:id/toggle
Authorization: Bearer <token>
```

#### Delete a todo
```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

#### Assign Todo
```http
PUT /api/todos/:id/assign
Content-Type: application/json
{ "assignedTo": "user_id" }
```

#### Unassign Todo
```http
DELETE /api/todos/:id/assign
```

#### Add Comment
```http
POST /api/todos/:id/comments
Content-Type: application/json
{ "text": "This is a comment" }
```

#### Edit Comment
```http
PUT /api/todos/:id/comments/:commentId
Content-Type: application/json
{ "text": "Updated comment text" }
```

#### Delete Comment
```http
DELETE /api/todos/:id/comments/:commentId
```

### Label Routes (`/api/labels`)

#### Get all labels
```http
GET /api/labels
```

#### Get single label
```http
GET /api/labels/:id
```

#### Create label
```http
POST /api/labels
{ "name": "Work", "color": "#FF0000" }
```

#### Update label
```http
PUT /api/labels/:id
{ "name": "Work Updated", "color": "#00FF00" }
```

#### Delete label
```http
DELETE /api/labels/:id
```

### Project Routes (`/api/projects`)

#### Get all projects
```http
GET /api/projects
```

#### Get single project
```http
GET /api/projects/:id
```

#### Create project
```http
POST /api/projects
{ "name": "My Project", "description": "..." }
```

#### Update project
```http
PUT /api/projects/:id
{ "name": "Updated Project", "description": "New description" }
```

#### Delete project
```http
DELETE /api/projects/:id
```

#### Generate Invite Link
```http
POST /api/projects/:id/invite
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in or registering, you'll receive a token that should be included in the `Authorization` header of subsequent requests:

```
Authorization: Bearer <your_token_here>
```

Tokens are also stored in HTTP-only cookies for enhanced security.

## 📊 Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Model
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  user: ObjectId (ref: User),
  project: ObjectId (ref: Project),
  labels: [ObjectId (ref: Label)],
  assignedTo: ObjectId (ref: User),
  comments: [{ user: ObjectId, text: String }],
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  name: String (required),
  description: String,
  members: [{ user: ObjectId, role: String }],
  createdAt: Date,
  updatedAt: Date
}
```

### Label Model
```javascript
{
  name: String (required),
  color: String (default: #000000),
  user: ObjectId (ref: User),
  createdAt: Date
}
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT authentication
- HTTP-only cookies
- CORS configuration
- Input validation
- Protected routes

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🧪 Testing the API

You can test the API using:
- **Postman** or **Insomnia** (API clients)
- **cURL** (command line)
- **Thunder Client** (VS Code extension)

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/todoify` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Parse cookies

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

## 👤 Author

Aditya Fulsoundar
