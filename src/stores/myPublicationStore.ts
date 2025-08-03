import { create } from 'zustand';

import {
  getAllMyPublications,
  PublicationCard,
} from 'src/services/PublicationService';

export enum PublicationFilters {
  LISTED = 'listed',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  RENTED_OUT = 'rentedOut',
  UNDER_REVIEW = 'underReview',
  RENTING = 'renting',
}

const filterToState: Partial<Record<PublicationFilters, string>> = {
  [PublicationFilters.LISTED]: 'listedPublications',
  [PublicationFilters.RENTED_OUT]: 'rentedOutPublications',
  [PublicationFilters.RENTING]: 'rentingPublications',
};

interface MyPublicationStore {
  isLoading: boolean;
  listedPublications: PublicationCard[];
  rentedOutPublications: PublicationCard[];
  rentingPublications: PublicationCard[];
  getAllMyPublications: (
    filter: PublicationFilters,
    showError: (err: string) => void
  ) => Promise<void>;
}

export const useMyPublicationStore = create<MyPublicationStore>((set) => ({
  isLoading: false,
  listedPublications: [],
  rentedOutPublications: [],
  rentingPublications: [],

  getAllMyPublications: async (
    filter: PublicationFilters,
    showError: (err: string) => void
  ) => {
    set({ isLoading: true });

    try {
      const params = new URLSearchParams({ filter });
      const response = await getAllMyPublications(`?${params}`);
      const stateKey = filterToState[filter];

      if (stateKey) {
        set({ [stateKey]: response });
      }
    } catch {
      showError('Публікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
    }
  },
}));
