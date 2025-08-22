import { create } from 'zustand';

import { getUserPublicProfile } from 'src/services/UserService';
import { PublicationCard } from 'src/services/PublicationService';
import { FirestoreTimestamp } from 'src/pages/PublicUserProfile/utils';

export interface Feedback {
  id: string;
  publicationTitle: string;
  authorImage: string;
  authorName: string;
  authorSurname: string;
  text: string;
  stars: number;
  createdAt: FirestoreTimestamp;
}

interface PublicUserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  surname: string;
  feedbacks: Feedback[];
  activeAt: string;
  rate: number;
  reviewCount: number;
  registrationDate: string;
  location: {
    country: string;
    city: string;
  };
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
