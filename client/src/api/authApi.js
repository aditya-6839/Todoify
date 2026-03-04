import api from '@/lib/api';

/** POST /api/auth/register  body: { name, email, password } */
export const register = (data) =>
    api.post('/auth/register', data).then(res => res.data);

/** POST /api/auth/login  body: { email, password } */
export const login = (data) =>
    api.post('/auth/login', data).then(res => res.data);

/** POST /api/auth/logout */
export const logout = () =>
    api.post('/auth/logout').then(res => res.data);

/** GET /api/auth/me */
export const getMe = () =>
    api.get('/auth/me').then(res => res.data);

/** POST /api/auth/google  body: { googleId, email, name, avatar } */
export const googleAuth = (data) =>
    api.post('/auth/google', data).then(res => res.data);
