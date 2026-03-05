import api from './axiosInstance';

export const authApi = {
  login: (userName: string, password: string) =>
    api.post('/auth/login', { userName, password }),

  register: (userName: string, password: string) =>
    api.post('/auth/register', { userName, password }),
};
