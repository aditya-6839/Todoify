import api from '@/lib/api';

/** GET /api/todos?search=&priority=&status=&project=&labels=&sort= */
export const getTodos = (params = {}) =>
    api.get('/todos', { params }).then(res => res.data);

/** GET /api/todos/:id */
export const getTodo = (id) =>
    api.get(`/todos/${id}`).then(res => res.data);

/** POST /api/todos  body: { title, description, priority, dueDate, project, labels } */
export const createTodo = (data) =>
    api.post('/todos', data).then(res => res.data);

/** PUT /api/todos/:id */
export const updateTodo = (id, data) =>
    api.put(`/todos/${id}`, data).then(res => res.data);

/** DELETE /api/todos/:id */
export const deleteTodo = (id) =>
    api.delete(`/todos/${id}`).then(res => res.data);

/** PATCH /api/todos/:id/toggle */
export const toggleTodo = (id) =>
    api.patch(`/todos/${id}/toggle`).then(res => res.data);

/** PUT /api/todos/:id/assign  body: { assignedTo } */
export const assignTodo = (id, assignedTo) =>
    api.put(`/todos/${id}/assign`, { assignedTo }).then(res => res.data);

/** DELETE /api/todos/:id/assign */
export const unassignTodo = (id) =>
    api.delete(`/todos/${id}/assign`).then(res => res.data);

/** POST /api/todos/:id/labels  body: { labelId } */
export const addLabelToTodo = (todoId, labelId) =>
    api.post(`/todos/${todoId}/labels`, { labelId }).then(res => res.data);

/** DELETE /api/todos/:id/labels/:labelId */
export const removeLabelFromTodo = (todoId, labelId) =>
    api.delete(`/todos/${todoId}/labels/${labelId}`).then(res => res.data);

/** POST /api/todos/:id/comments  body: { text } */
export const addComment = (todoId, text) =>
    api.post(`/todos/${todoId}/comments`, { text }).then(res => res.data);

/** PUT /api/todos/:id/comments/:commentId  body: { text } */
export const editComment = (todoId, commentId, text) =>
    api.put(`/todos/${todoId}/comments/${commentId}`, { text }).then(res => res.data);

/** DELETE /api/todos/:id/comments/:commentId */
export const deleteComment = (todoId, commentId) =>
    api.delete(`/todos/${todoId}/comments/${commentId}`).then(res => res.data);
