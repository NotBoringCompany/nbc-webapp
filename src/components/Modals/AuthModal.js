import { Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AuthForm from '../Form/AuthForm';

const AuthModal = () => {
  const { user } = useMoralis();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (user) {
      setOpened(!user.attributes.email);
    }
  }, [user, user?.attributes]);

  return (
    <Modal
      centered
      title='Link your account'
      opened={opened}
      onClose={() => setOpened(false)}
      size={'md'}
    >
      <AuthForm />
    </Modal>
  );
};

export default AuthModal;
