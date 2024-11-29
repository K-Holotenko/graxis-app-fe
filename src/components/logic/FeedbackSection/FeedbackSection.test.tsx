import { render } from '@testing-library/react';

import { FeedbackSection } from '.';

describe('FeedbackSection', () => {
  it('render the section correctly', () => {
    const { getByTestId } = render(<FeedbackSection />);
    const feedbackSection = getByTestId('feedback-section');

    expect(feedbackSection).toBeInTheDocument();
  });

  it('render the section title correctly', () => {
    const { getByTestId } = render(<FeedbackSection />);
    const feedbackSectionTitle = getByTestId('feedback-title');

    expect(feedbackSectionTitle).toBeInTheDocument();
  });
});
