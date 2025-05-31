// TODO Tests configuration should be updated to fix the following error:
//  Found a label with the text of: грн/день, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.

describe('PriceInputs', () => {
  it('test configuration sh', () => {});
});

// import { Form } from 'antd';
// import { render, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import { TEXT } from 'src/config/constants';

// import { inputs, PriceInputs } from '.';

// const onFinish = vi.fn();

// describe('PriceInputs', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("shouldn't throw error if at least one price set", async () => {
//     const { getByTestId, getByLabelText } = render(
//       <Form layout="vertical" onFinish={onFinish}>
//         <PriceInputs />
//         <button data-testid="submit-btn" type="submit" />
//       </Form>
//     );

//     await userEvent.type(getByLabelText(inputs[1].label), '250');
//     getByTestId('submit-btn').click();

//     await waitFor(() => expect(onFinish).toHaveBeenCalled());
//   });

//   it('should accept only positive numbers', async () => {
//     const { getByLabelText } = render(
//       <Form layout="vertical">
//         <PriceInputs />
//         <button data-testid="submit-btn" type="submit" />
//       </Form>
//     );

//   const input = getByLabelText(inputs[0].label);

//   await userEvent.type(input, '-1');
//   expect(input).toHaveValue(0);
//   });

//   it('should has min/max values', async () => {
//     const { getByTestId, getByLabelText, findByText } = render(
//       <Form layout="vertical">
//         <PriceInputs />
//         <button data-testid="submit-btn" type="submit" />
//       </Form>
//     );

//     const firstInp = getByLabelText(inputs[0].label);
//     const submitBtn = getByTestId('submit-btn');

//     await userEvent.type(firstInp, '0');
//     submitBtn.click();
//     await findByText(TEXT.MIN_VALUE(10));

//     await userEvent.clear(firstInp);
//     await userEvent.type(firstInp, '999999.1');
//     expect(firstInp).toHaveValue(999999);
//   });

//   it('should strip more than 2 decimals', async () => {
//     const { getByTestId, getByLabelText } = render(
//       <Form layout="vertical">
//         <PriceInputs />
//         <button data-testid="submit-btn" type="submit" />
//       </Form>
//     );

//     const input = getByLabelText(inputs[0].label);

//     await userEvent.type(input, '10.9999');

//     getByTestId('submit-btn').click();

//     await waitFor(() => expect(input).toHaveValue(10.99));
//   });
// });
