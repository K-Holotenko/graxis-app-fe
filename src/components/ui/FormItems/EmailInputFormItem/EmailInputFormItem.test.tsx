import { fireEvent, render } from '@testing-library/react';
import { Form } from 'antd';

import { EmailInputFormItem } from './index';

const label = 'Email';
const validAsciiEmails = [
  'john.doe@example.com',
  'jane.smith123@domain.org',
  'user_name-2024@service.co.uk',
  'anton+project@myemail.net',
];

describe('EmailInputFormItem', () => {
  it('should allow entry of ASCII characters', () => {
    const { getByLabelText } = render(
      <Form>
        <EmailInputFormItem label={label} />
      </Form>
    );
    const inputEl = getByLabelText(label) as HTMLInputElement;

    validAsciiEmails.forEach((validAsciiEmail) => {
      fireEvent.change(inputEl, { target: { value: validAsciiEmail } });
      expect(inputEl.value).toBe(validAsciiEmail);
    });
  });

  it("shouldn't allow entry of not-ASCII characters", () => {
    const { getByLabelText } = render(
      <Form>
        <EmailInputFormItem label={label} />
      </Form>
    );
    const inputEl = getByLabelText(label) as HTMLInputElement;

    fireEvent.change(inputEl, { target: { value: 'μπανάνα' } });
    expect(inputEl.value).toBe('');

    fireEvent.change(inputEl, { target: { value: 'дружба' } });
    expect(inputEl.value).toBe('');

    fireEvent.change(inputEl, { target: { value: 'ありがとう' } });
    expect(inputEl.value).toBe('');
  });
});
