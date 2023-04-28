import { Modal } from '@mantine/core';
import { useMoralis } from 'react-moralis';

const AuthModal = () => {
  const { isAuthenticated, user, login } = useMoralis();
  console.log(user && user.attributes);
  console.log({ isAuthenticated });
  if (!user) {
    return null;
  }
  return (
    <Modal opened size={'md'}>
      asd
    </Modal>
  );
};

export default AuthModal;
