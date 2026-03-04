import api from '@/lib/api';

/** GET /api/users/profile */
export const getUserProfile = () =>
    api.get('/users/profile').then(res => res.data);

/** PUT /api/users/profile  body: { name?, email?, avatar? } */
export const updateUserProfile = (data) =>
    api.put('/users/profile', data).then(res => res.data);

/** PUT /api/users/password  body: { currentPassword, newPassword } */
export const changePassword = (currentPassword, newPassword) =>
    api.put('/users/password', { currentPassword, newPassword }).then(res => res.data);

/** PUT /api/users/avatar  body: { avatar } */
export const updateAvatar = (avatar) =>
    api.put('/users/avatar', { avatar }).then(res => res.data);

/** DELETE /api/users/avatar */
export const removeAvatar = () =>
    api.delete('/users/avatar').then(res => res.data);

/** DELETE /api/users/account  body: { password? } */
export const deleteAccount = (password) =>
    api.delete('/users/account', { data: { password } }).then(res => res.data);

/** GET /api/users/stats */
export const getUserStats = () =>
    api.get('/users/stats').then(res => res.data);
