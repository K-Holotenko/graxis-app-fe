import { render } from '@testing-library/react';

import { TEXT } from 'src/config/constants';

import { FeedbackSection } from '.';

describe('FeedbackSection', () => {
  it('render the section correctly', () => {
    const { getByTestId } = render(<FeedbackSection />);
    const feedbackSection = getByTestId('feedback-section');

    expect(feedbackSection).toBeInTheDocument();
  });

  it('render the section title correctly', () => {
    const { getByText } = render(<FeedbackSection />);
    const categoriesSectionTitle = getByText(TEXT.FEEDBACKS);

    expect(categoriesSectionTitle).toBeInTheDocument();
  });
});
