import { useState } from 'react';

import { Heading } from 'src/components/Heading';

import styles from './styles.module.scss';

interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 500;

  const showShortText = description.length > maxLength;
  const displayedText =
    showShortText && !isExpanded
      ? `${description.slice(0, maxLength)}...`
      : description;

  return (
    <div className={styles.descriptionContainer}>
      <Heading level={4} className={styles.heading}>
        Опис
      </Heading>
      <p className={styles.description}>{displayedText}</p>
      {showShortText && (
        <button
          className={styles.moreButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Менше' : 'Більше'}
        </button>
      )}
    </div>
  );
};
