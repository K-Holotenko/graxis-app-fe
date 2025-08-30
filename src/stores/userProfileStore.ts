import { create } from 'zustand';

import { getUserPublicProfile } from 'src/services/UserService';
import { UserProfileData } from 'src/types';

interface UserProfileStore {
  profile: UserProfileData | null;
  isLoading: boolean;
  getUserPublicProfile: (id: string) => Promise<void>;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  profile: null,
  isLoading: false,
  getUserPublicProfile: async (id: string) => {
    set({ isLoading: true });

    try {
      const profile = await getUserPublicProfile(id);

      const profileWithAddedReviewCount = {
        author: {
          ...profile?.author,
        },
        publications: profile?.publications.map((publication) => ({
          ...publication,
          reviewCount: 1,
        })),
      };

      set({ profile: profileWithAddedReviewCount });
    } catch {
      set({ profile: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
