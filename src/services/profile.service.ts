import http from '@/lib/http/client';

export const profileService = {
  getProfileData: () => http.get('/admin/profile').then(res => res.data),
  updateName: (name: string) => http.put('/admin/profile', { name }).then(res => res.data),
  updatePassword: (payload: any) => http.patch('/admin/profile', payload).then(res => res.data),
};
