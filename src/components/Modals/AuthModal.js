import { Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AuthForm from '../Form/AuthForm';

const AuthModal = () => {
  const { user, isUserUpdating } = useMoralis();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (user) {
      if (!isUserUpdating && !user.attributes.email) {
        setOpened(true);
        return;
      }

      if (!isUserUpdating && user.attributes.email) {
        setOpened(false);
      }
    }
  }, [user, isUserUpdating, user?.attributes.email]);

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
