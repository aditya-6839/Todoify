# Todoify API Documentation

This document provides a comprehensive overview of the Todoify API, including schemas, routes, controllers, and possible responses.

## Table of Contents
1. [Overview](#overview)
2. [Authentication APIs](#authentication-apis)
3. [User APIs](#user-apis)
4. [Project APIs](#project-apis)
5. [Todo APIs](#todo-apis)
6. [Label APIs](#label-apis)
7. [Database Schemas](#database-schemas)

---

## Overview
- **Base URL**: `/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT via HTTP-only cookie (`token`) or Authorization header.
- **Success Response Format**: 
  ```json
  {
    "success": true,
    "data": { ... } or [ ... ],
    "message": "Optional message"
  }
  ```
- **Error Response Format**:
  ```json
  {
    "success": false,
    "message": "Error description"
  }
  ```

---

## Authentication APIs
Base Route: `/api/auth`

### 1. Register User
- **Route**: `POST /register`
- **Access**: Public
- **Request Body**: `{ "name": "...", "email": "...", "password": "..." }`
- **Responses**:
  - `201 Created`: Success. Returns user data and sets cookie.
  - `400 Bad Request`: Missing fields, user already exists, or empty body.

### 2. Login User
- **Route**: `POST /login`
- **Access**: Public
- **Request Body**: `{ "email": "...", "password": "..." }`
- **Responses**:
  - `200 OK`: Success. Returns user data and sets cookie.
  - `400 Bad Request`: Missing fields or empty body.
  - `401 Unauthorized`: Invalid credentials.

### 3. Google OAuth Login/Register
- **Route**: `POST /google`
- **Access**: Public
- **Request Body**: `{ "googleId": "...", "email": "...", "name": "...", "avatar": "..." }`
- **Responses**:
  - `200 OK`: Success. Returns user data.
  - `400 Bad Request`: Missing Google ID or email.

### 4. Logout User
- **Route**: `POST /logout`
- **Access**: Private
- **Responses**:
  - `200 OK`: Success. Clears the authentication cookie.

### 5. Get Current User (Me)
- **Route**: `GET /me`
- **Access**: Private
- **Responses**:
  - `200 OK`: Success. Returns current user's profile.

---

## User APIs
Base Route: `/api/users`

### 1. Get User Profile
- **Route**: `GET /profile`
- **Access**: Private
- **Responses**:
  - `200 OK`: Success. Returns user data.
  - `404 Not Found`: User not found.

### 2. Update User Profile
- **Route**: `PUT /profile`
- **Access**: Private
- **Request Body**: `{ "name": "...", "email": "...", "avatar": "..." }` (All optional)
- **Responses**:
  - `200 OK`: Success. Returns updated user data.
  - `400 Bad Request`: Email already in use.

### 3. Change Password
- **Route**: `PUT /password`
- **Access**: Private
- **Request Body**: `{ "currentPassword": "...", "newPassword": "..." }`
- **Responses**:
  - `200 OK`: Success.
  - `400 Bad Request`: Missing fields, short password, or Google account.
  - `401 Unauthorized`: Incorrect current password.

### 4. Update Avatar
- **Route**: `PUT /avatar`
- **Access**: Private
- **Request Body**: `{ "avatar": "URL" }`
- **Responses**:
  - `200 OK`: Success. Returns new avatar URL.
  - `400 Bad Request`: URL missing.

### 5. Remove Avatar
- **Route**: `DELETE /avatar`
- **Access**: Private
- **Responses**:
  - `200 OK`: Success.

### 6. Delete User Account
- **Route**: `DELETE /account`
- **Access**: Private
- **Request Body**: `{ "password": "..." }` (Required for local auth)
- **Responses**:
  - `200 OK`: Success.
  - `401 Unauthorized`: Incorrect password.

### 7. Get User Statistics
- **Route**: `GET /stats`
- **Access**: Private
- **Responses**:
  - `200 OK`: Success. Returns counts of todos, completion rate, priority breakdown, etc.

### 8. Get All Users (Admin)
- **Route**: `GET /`
- **Access**: Private/Admin
- **Responses**:
  - `200 OK`: Success. List of all users.

---

## Project APIs
Base Route: `/api/projects`

### 1. Get All Projects
- **Route**: `GET /`
- **Access**: Private
- **Responses**:
  - `200 OK`: Returns projects the user is a member of.

### 2. Create Project
- **Route**: `POST /`
- **Access**: Private
- **Request Body**: `{ "name": "...", "description": "...", "status": "...", "priority": "...", "category": "...", "deadline": "..." }`
- **Responses**:
  - `201 Created`: Success. Returns created project.

### 3. Get Single Project
- **Route**: `GET /:id`
- **Access**: Private (Members only)
- **Responses**:
  - `200 OK`: Success.
  - `403 Forbidden`: User is not a member.
  - `404 Not Found`: Project not found.

### 4. Update Project
- **Route**: `PUT /:id`
- **Access**: Private (Admin/Owner only)
- **Request Body**: `{ "name": "...", "description": "...", "status": "...", "priority": "...", "category": "...", "deadline": "...", "permissions": "{}" }`
- **Responses**:
  - `200 OK`: Success.
  - `403 Forbidden`: User is not a project admin.

### 5. Delete Project
- **Route**: `DELETE /:id`
- **Access**: Private (Admin/Owner only)
- **Responses**:
  - `200 OK`: Success. (Deletes project and its todos)
  - `403 Forbidden`: Not authorized.

### 6. Generate Invite Link
- **Route**: `POST /:id/invite`
- **Access**: Private (Admin/Owner only)
- **Request Body**: `{ "expiryHours": 168 }`
- **Responses**:
  - `200 OK`: Success. Returns `inviteToken` and `inviteUrl`.

### 7. Join via Invite Link
- **Route**: `POST /join/:token`
- **Access**: Private
- **Responses**:
  - `200 OK`: Success. User added to project.
  - `400 Bad Request`: Link expired or already a member.
  - `404 Not Found`: Invalid token.

### 8. Get Project Todos
- **Route**: `GET /:id/todos`
- **Access**: Private (Members only)
- **Responses**:
  - `200 OK`: Success. List of todos in the project.

---

## Todo APIs
Base Route: `/api/todos`

### 1. Get Todos
- **Route**: `GET /`
- **Access**: Private
- **Query Params**: `search`, `priority`, `status`, `project`, `labels`, `sort`
- **Responses**:
  - `200 OK`: Success. Returns filtered/sorted list of todos.

### 2. Create Todo
- **Route**: `POST /`
- **Access**: Private
- **Request Body**: `{ "title": "...", "description": "...", "priority": "...", "dueDate": "...", "project": "...", "assignedTo": "...", "labels": [...] }`
- **Responses**:
  - `201 Created`: Success.

### 3. Update Todo
- **Route**: `PUT /:id`
- **Access**: Private (Owner only)
- **Responses**:
  - `200 OK`: Success.
  - `401 Unauthorized`: Not the owner.

### 4. Toggle Todo Completion
- **Route**: `PATCH /:id/toggle`
- **Access**: Private (Owner only)
- **Responses**:
  - `200 OK`: Success. Toggles `completed` field.

### 5. Assign Todo
- **Route**: `PUT /:id/assign`
- **Access**: Private (Owner only)
- **Request Body**: `{ "assignedTo": "userId" }`
- **Responses**:
  - `200 OK`: Success.
  - `400 Bad Request`: User not in project members.

### 6. Comments
- **Add**: `POST /:id/comments` (`{ "text": "..." }`)
- **Edit**: `PUT /:id/comments/:commentId` (`{ "text": "..." }`)
- **Delete**: `DELETE /:id/comments/:commentId`

---

## Label APIs
Base Route: `/api/labels`

### 1. Get All Labels
- **Route**: `GET /`
- **Access**: Private
- **Responses**:
  - `200 OK`: Returns user's labels.

### 2. Create Label
- **Route**: `POST /`
- **Access**: Private
- **Request Body**: `{ "name": "...", "color": "..." }`
- **Responses**:
  - `201 Created`: Success.
  - `400 Bad Request`: Duplicate label name.

### 3. Manage Labels on Todos
- **Add Label**: `POST /api/todos/:id/labels` (`{ "labelId": "..." }`)
- **Remove Label**: `DELETE /api/todos/:id/labels/:labelId`

---

## Database Schemas

### User Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Required, trimmed. |
| `email` | String | Required, unique, lowercase. |
| `password` | String | Required (for local auth), min 8 chars. |
| `avatar` | String | Default: null. |
| `authProvider` | String | Enum: `['local', 'google']`, Default: `local`. |
| `googleId` | String | Optional, unique. |
| `role` | String | Enum: `['user', 'admin']`, Default: `user`. |

### Project Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Required. |
| `members` | Array | `[{ user: ObjectId, role: Enum['owner', 'admin', 'member'] }]` |
| `status` | String | Enum: `['active', 'on-hold', 'completed', 'archived']` |
| `priority` | String | Enum: `['low', 'medium', 'high']` |
| `category` | String | Enum: `['work', 'personal', 'education', 'health', 'finance', 'other']` |
| `inviteToken`| String | Used for invite links. |

### Todo Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Required. |
| `completed` | Boolean | Default: `false`. |
| `priority` | String | Enum: `['low', 'medium', 'high']` |
| `user` | ObjectId | Creator of the todo. |
| `project` | ObjectId | Reference to Project. |
| `assignedTo`| ObjectId | Reference to User. |
| `comments` | Array | `[{ user: ObjectId, text: String, createdAt: Date }]` |

### Label Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Required. |
| `color` | String | Required. |
| `user` | ObjectId | Creator of the label. |
| `project` | ObjectId | Optional project context. |
