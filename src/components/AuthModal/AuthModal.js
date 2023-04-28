import { Modal, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AuthForm from '../Form/AuthForm';

const AuthModal = () => {
  const { user } = useMoralis();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (user) {
      if (!user.attributes.email) {
        setOpened(true);
      }
    }
  }, [user]);

  return (
    <Modal
      centered
      title="Complete your account"
      opened={opened}
      onClose={() => setOpened(false)}
      size={'md'}
    >
      <Text size={'md'}>
        <b>Connect your email and password</b> to easily log in next time.
      </Text>
      <AuthForm />
    </Modal>
  );
};

export default AuthModal;
