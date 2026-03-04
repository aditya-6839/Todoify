import api from '@/lib/api';

/** GET /api/labels */
export const getLabels = () =>
    api.get('/labels').then(res => res.data);

/** GET /api/labels/:id */
export const getLabel = (id) =>
    api.get(`/labels/${id}`).then(res => res.data);

/** POST /api/labels  body: { name, color, project? } */
export const createLabel = (data) =>
    api.post('/labels', data).then(res => res.data);

/** PUT /api/labels/:id  body: { name?, color? } */
export const updateLabel = (id, data) =>
    api.put(`/labels/${id}`, data).then(res => res.data);

/** DELETE /api/labels/:id */
export const deleteLabel = (id) =>
    api.delete(`/labels/${id}`).then(res => res.data);
