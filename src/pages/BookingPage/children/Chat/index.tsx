import { Form } from 'antd';

import { Input } from 'src/components/Input';
import { Container } from 'src/pages/BookingPage/children/Container';
import { Button } from 'src/components/Button';
import SendIcon from 'src/assets/icons/send.svg?react';

import styles from './styles.module.scss';

export const Chat = () => (
  <Container>
    <p className={styles.title}>Чат</p>
    <div className={styles.chat}>
      {/* Example messages */}
      <div className={`${styles.message} ${styles.received}`}>
        <div className={styles.headerMessage}>
          <span className={styles.messageDetail}>Євген</span>
          <span className={styles.messageDetail}>10:01 AM</span>
        </div>
        <p>Hi there! This is a message from the other user.</p>
      </div>
      <div className={`${styles.message} ${styles.sent}`}>
        <div className={styles.headerMessage}>
          <span className={styles.messageDetail}>10:00 AM</span>
        </div>
        <p>Hello! This is a message from the current user.</p>
      </div>
      <div className={`${styles.message} ${styles.received}`}>
        <div className={styles.headerMessage}>
          <span className={styles.messageDetail}>Євген</span>
          <span className={styles.messageDetail}>10:01 AM</span>
        </div>
        <p>
          Hi there! This is a message from the other user. This is a multiline
          message to demonstrate the chat layout.
        </p>
      </div>
      <div className={`${styles.message} ${styles.sent}`}>
        <div className={styles.headerMessage}>
          <span className={styles.messageDetail}>10:00 AM</span>
        </div>
        <p>Hello! This is a message from the current user.</p>
      </div>
      <div className={`${styles.message} ${styles.received}`}>
        <div className={styles.headerMessage}>
          <span className={styles.messageDetail}>Євген</span>
          <span className={styles.messageDetail}>10:01 AM</span>
        </div>
        <p>
          Hi there! This is a message from the other user. This is a multiline
          message to demonstrate the chat layout.
        </p>
      </div>
      <div className={`${styles.message} ${styles.sent}`}>
        <div className={styles.headerMessage}>
          <span className={styles.messageDetail}>10:00 AM</span>
        </div>
        <p>Hello! This is a message from the current user.</p>
      </div>
    </div>
    <div>
      <Form>
        <div className={styles.inputContainer}>
          <Form.Item className={styles.input}>
            <Input placeholder="Напишіть повідомлення..." />
          </Form.Item>
          <Button
            htmlType="submit"
            className={styles.sendButton}
            icon={<SendIcon />}
          />
        </div>
      </Form>
    </div>
  </Container>
);
