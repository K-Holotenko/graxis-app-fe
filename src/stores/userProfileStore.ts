import { create } from 'zustand';

import { getUserPublicProfile } from 'src/services/UserService';
import { PublicationCard } from 'src/services/PublicationService';
import { Feedback } from 'src/pages/HomePage/children/FeedbackSectionCard';

interface PublicUserProfile {
  id: string;
  name: string;
  surname: string;
  feedbacks: Feedback[];
  activeAt: string;
  rate: number;
  reviewCount: number;
  registrationDate: string;
}

export interface UserProfileData {
  author: PublicUserProfile;
  publications: PublicationCard[];
}

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
      const profile: UserProfileData | null = await getUserPublicProfile(id);

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
