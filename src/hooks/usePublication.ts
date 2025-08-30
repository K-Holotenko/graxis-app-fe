import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import {
  getMyPublicationById,
  getPublicationById,
} from 'src/services/PublicationService';
import { Publication, MyPublication } from 'src/types';

interface UsePublication {
  publication: Publication | MyPublication | null;
  isPublicationLoading: boolean;
  hasError: boolean;
  isEditable: boolean;
}

export const usePublication = (): UsePublication => {
  const params = useParams();
  const location = useLocation();
  const isEditPublicationPage = location.pathname.includes('edit-publication');

  const [publication, setPublication] = useState<
    Publication | MyPublication | null
  >(null);
  const [isPublicationLoading, setIsPublicationLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const { user, isLoading: isUserLoading } = useAuthStore();

  useEffect(() => {
    const fetchPublicationById = async (): Promise<void> => {
      if (!params.id) {
        setIsPublicationLoading(false);

        return;
      }

      try {
        const fetchedPublication: Publication | MyPublication | null =
          isEditPublicationPage
            ? await getMyPublicationById(params.id)
            : await getPublicationById(params.id);

        setPublication(fetchedPublication);
        setIsEditable(
          fetchedPublication
            ? user?.id === fetchedPublication.ownerInfo?.id
            : false
        );
      } catch {
        setHasError(true);
      } finally {
        setIsPublicationLoading(false);
      }
    };

    fetchPublicationById();
  }, [params.id, isEditPublicationPage, user?.id, isUserLoading]);

  return {
    publication,
    isPublicationLoading: isPublicationLoading || isUserLoading,
    hasError,
    isEditable,
  };
};
