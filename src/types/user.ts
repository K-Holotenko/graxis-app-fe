import { PublicationCard } from './publication';
import { FirestoreTimestamp } from './common';

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

export interface PublicUserProfile {
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
