import api from '@/lib/api';

/** GET /api/projects */
export const getProjects = () =>
    api.get('/projects').then(res => res.data);

/** GET /api/projects/:id */
export const getProject = (id) =>
    api.get(`/projects/${id}`).then(res => res.data);

/** POST /api/projects  body: { name, description, status, priority, category, deadline } */
export const createProject = (data) =>
    api.post('/projects', data).then(res => res.data);

/** PUT /api/projects/:id */
export const updateProject = (id, data) =>
    api.put(`/projects/${id}`, data).then(res => res.data);

/** DELETE /api/projects/:id */
export const deleteProject = (id) =>
    api.delete(`/projects/${id}`).then(res => res.data);

/** DELETE /api/projects/:id/members/:userId */
export const removeMember = (projectId, userId) =>
    api.delete(`/projects/${projectId}/members/${userId}`).then(res => res.data);

/** PUT /api/projects/:id/members/:userId  body: { role } */
export const updateMemberRole = (projectId, userId, role) =>
    api.put(`/projects/${projectId}/members/${userId}`, { role }).then(res => res.data);

/** POST /api/projects/:id/invite  body: { expiryHours? } */
export const generateInviteLink = (projectId, expiryHours) =>
    api.post(`/projects/${projectId}/invite`, { expiryHours }).then(res => res.data);

/** PUT /api/projects/:id/invite  body: { expiryHours? } */
export const regenerateInviteLink = (projectId, expiryHours) =>
    api.put(`/projects/${projectId}/invite`, { expiryHours }).then(res => res.data);

/** DELETE /api/projects/:id/invite */
export const revokeInviteLink = (projectId) =>
    api.delete(`/projects/${projectId}/invite`).then(res => res.data);

/** POST /api/projects/join/:token */
export const joinViaInvite = (token) =>
    api.post(`/projects/join/${token}`).then(res => res.data);

/** GET /api/projects/:id/todos */
export const getProjectTodos = (projectId) =>
    api.get(`/projects/${projectId}/todos`).then(res => res.data);
