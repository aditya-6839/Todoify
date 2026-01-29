// // API Testing Examples for Todoify Backend
// // You can use these with Thunder Client, Postman, or any HTTP client

// /**
//  * BASE URL: http://localhost:5000
//  */

// // ========================================
// // AUTHENTICATION ENDPOINTS
// // ========================================

// // 1. REGISTER A NEW USER
// // POST http://localhost:5000/api/auth/register
// // Body (JSON):
// {
//     "name": "John Doe",
//         "email": "john@example.com",
//             "password": "password123"
// }

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "name": "John Doe",
//                 "email": "john@example.com",
//                     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//     }
// }

// // ========================================

// // 2. LOGIN
// // POST http://localhost:5000/api/auth/login
// // Body (JSON):
// {
//     "email": "john@example.com",
//         "password": "password123"
// }

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "name": "John Doe",
//                 "email": "john@example.com",
//                     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//     }
// }

// // ========================================

// // 3. GET CURRENT USER (Protected Route)
// // GET http://localhost:5000/api/auth/me
// // Headers:
// // Authorization: Bearer <your_token_here>

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "name": "John Doe",
//                 "email": "john@example.com",
//                     "createdAt": "...",
//                         "updatedAt": "..."
//     }
// }

// // ========================================

// // 4. LOGOUT
// // POST http://localhost:5000/api/auth/logout
// // Headers:
// // Authorization: Bearer <your_token_here>

// // Expected Response:
// {
//     "success": true,
//         "message": "Logged out successfully"
// }

// // ========================================
// // TODO ENDPOINTS (All require authentication)
// // ========================================

// // 5. CREATE A TODO
// // POST http://localhost:5000/api/todos
// // Headers:
// // Authorization: Bearer <your_token_here>
// // Body (JSON):
// {
//     "title": "Complete project documentation",
//         "description": "Write comprehensive docs for the Todoify app",
//             "priority": "high",
//                 "dueDate": "2026-02-15"
// }

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "title": "Complete project documentation",
//                 "description": "Write comprehensive docs for the Todoify app",
//                     "completed": false,
//                         "priority": "high",
//                             "dueDate": "2026-02-15T00:00:00.000Z",
//                                 "user": "...",
//                                     "createdAt": "...",
//                                         "updatedAt": "..."
//     }
// }

// // ========================================

// // 6. GET ALL TODOS
// // GET http://localhost:5000/api/todos
// // Headers:
// // Authorization: Bearer <your_token_here>

// // Expected Response:
// {
//     "success": true,
//         "count": 1,
//             "data": [
//                 {
//                     "_id": "...",
//                     "title": "Complete project documentation",
//                     "description": "Write comprehensive docs for the Todoify app",
//                     "completed": false,
//                     "priority": "high",
//                     "dueDate": "2026-02-15T00:00:00.000Z",
//                     "user": "...",
//                     "createdAt": "...",
//                     "updatedAt": "..."
//                 }
//             ]
// }

// // ========================================

// // 7. GET SINGLE TODO
// // GET http://localhost:5000/api/todos/:id
// // Headers:
// // Authorization: Bearer <your_token_here>

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "title": "Complete project documentation",
//                 "description": "Write comprehensive docs for the Todoify app",
//                     "completed": false,
//                         "priority": "high",
//                             "dueDate": "2026-02-15T00:00:00.000Z",
//                                 "user": "...",
//                                     "createdAt": "...",
//                                         "updatedAt": "..."
//     }
// }

// // ========================================

// // 8. UPDATE A TODO
// // PUT http://localhost:5000/api/todos/:id
// // Headers:
// // Authorization: Bearer <your_token_here>
// // Body (JSON):
// {
//     "title": "Updated: Complete project documentation",
//         "completed": true
// }

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "title": "Updated: Complete project documentation",
//                 "completed": true,
//                     "priority": "high",
//                         "dueDate": "2026-02-15T00:00:00.000Z",
//                             "user": "...",
//                                 "createdAt": "...",
//                                     "updatedAt": "..."
//     }
// }

// // ========================================

// // 9. TOGGLE TODO COMPLETION
// // PATCH http://localhost:5000/api/todos/:id/toggle
// // Headers:
// // Authorization: Bearer <your_token_here>

// // Expected Response:
// {
//     "success": true,
//         "data": {
//         "_id": "...",
//             "title": "Complete project documentation",
//                 "completed": true, // This will be toggled
//     ...
//     }
// }

// // ========================================

// // 10. DELETE A TODO
// // DELETE http://localhost:5000/api/todos/:id
// // Headers:
// // Authorization: Bearer <your_token_here>

// // Expected Response:
// {
//     "success": true,
//         "data": { }
// }

// // ========================================
// // ERROR RESPONSES
// // ========================================

// // Unauthorized (no token or invalid token):
// {
//     "success": false,
//         "message": "Not authorized to access this route"
// }

// // Validation Error:
// {
//     "success": false,
//         "error": "Please provide a title"
// }

// // Resource Not Found:
// {
//     "success": false,
//         "message": "Todo not found"
// }

// // ========================================
// // TESTING WITH cURL
// // ========================================

// // Register:
// // curl -X POST http://localhost:5000/api/auth/register \
// //   -H "Content-Type: application/json" \
// //   -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

// // Login:
// // curl -X POST http://localhost:5000/api/auth/login \
// //   -H "Content-Type: application/json" \
// //   -d '{"email":"john@example.com","password":"password123"}'

// // Get Todos:
// // curl -X GET http://localhost:5000/api/todos \
// //   -H "Authorization: Bearer YOUR_TOKEN_HERE"

// // Create Todo:
// // curl -X POST http://localhost:5000/api/todos \
// //   -H "Content-Type: application/json" \
// //   -H "Authorization: Bearer YOUR_TOKEN_HERE" \
// //   -d '{"title":"Test Todo","priority":"medium"}'
