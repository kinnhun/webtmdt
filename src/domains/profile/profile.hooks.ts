import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './profile.api';

export const profileKeys = {
  all: ['profile'] as const,
  data: () => [...profileKeys.all, 'data'] as const,
};

export const useProfileData = () => {
  return useQuery({
    queryKey: profileKeys.data(),
    queryFn: () => profileApi.getProfileData(),
  });
};

export const useUpdateName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => profileApi.updateName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (payload: any) => profileApi.updatePassword(payload),
  });
};
