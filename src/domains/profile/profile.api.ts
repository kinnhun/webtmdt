import { profileService } from '@/services/profile.service';

export const profileApi = {
  getProfileData: () => profileService.getProfileData(),
  updateName: (name: string) => profileService.updateName(name),
  updatePassword: (payload: any) => profileService.updatePassword(payload),
};
