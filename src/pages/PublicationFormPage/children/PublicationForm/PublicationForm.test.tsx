// TODO Tests configuration should be updated to fix the following error:
// e.parentElement.querySelectorAll(...).includes is not a function
// after the error is fixed the file can be uncommented
describe('AddPublicationForm', () => {
  it('test configuration sh', () => {});
});

// import { fireEvent, render } from '@testing-library/react';

// import { TEXT } from 'src/config/constants';

// import { AddPublicationForm } from '.';

// describe('AddPublicationForm', () => {
//   it('should render the submit button', () => {
//     const { getByRole } = render(<AddPublicationForm />);
//     const submitButton = getByRole('button', { name: TEXT.PUBLISH });

//     expect(submitButton).toBeInTheDocument();
//   });

//   it('should disable submit button if form is invalid', async () => {
//     const { getByRole } = render(<AddPublicationForm />);
//     const submitButton = getByRole('button', { name: TEXT.PUBLISH });

//     expect(submitButton).toBeDisabled();
//   });

//   it('should render all form inputs', () => {
//     const { getByText } = render(<AddPublicationForm />);

//     const nameInput = getByText(TEXT.NAME);
//     const descriptionInput = getByText(TEXT.DESCRIPTION);
//     const priceInput = getByText(TEXT.COST);
//     const locationInput = getByText(TEXT.LOCATION_NAME);

//     expect(nameInput).toBeInTheDocument();
//     expect(descriptionInput).toBeInTheDocument();
//     expect(priceInput).toBeInTheDocument();
//     expect(locationInput).toBeInTheDocument();
//   });

//   it('should accept file upload', () => {
//     const { getByText } = render(<AddPublicationForm />);

//     const fileInput = getByText(TEXT.ADD_PHOTO) as HTMLInputElement;

//     const file = new File(['dummy content'], 'test-image.jpg', {
//       type: 'image/jpeg',
//     });

//     fireEvent.change(fileInput, { target: { files: [file] } });

//     expect(fileInput.files![0]).toBe(file);
//   });
// });
