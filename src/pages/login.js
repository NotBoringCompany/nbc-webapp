import AuthForm from '@/components/Form/AuthForm';
import Layout from '@/components/Layout/Layout';
import ForgotPasswordRequestModal from '@/components/Modals/ForgotPasswordRequestModal';
import SignupModal from '@/components/Modals/SignupModal';
import { Flex, Text, Button } from '@mantine/core';
import { useState } from 'react';

const Login = () => {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  return (
    <Layout
      pageTitle={'Login'}
      description='Log in to your Not Boring Company account'
      mustNotAuth
    >
      <ForgotPasswordRequestModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      <Flex
        direction='column'
        sx={(theme) => ({
          margin: 'auto',
          width: '100%',
          maxWidth: '480px',
          borderRadius: '8px',
          padding: '24px',
          paddingBottom: '32px',
          border: `2px solid ${theme.colors.nbcGreen[0]}`,
        })}
      >
        <Text
          sx={(theme) => ({
            margin: 0,
            marginBottom: '8px',
            color: theme.colors.nbcGreen[0],
            fontWeight: 600,
            fontSize: 32,
          })}
        >
          Login
        </Text>
        <AuthForm forLogin />
        <Flex
          direction='row'
          justify='space-between'
        >
          <Button
            onClick={() => setIsForgotPasswordModalOpen(true)}
            mt='md'
            variant='subtle'
            sx={(theme) => ({
              color: theme.colors.nbcGreen[0],
              justifyContent: 'flex-start',
              padding: 0,
              width: 'fit-content',
              ':hover': {
                background: 'transparent',
              },
            })}
          >
            Forgot password
          </Button>
          <Button
            onClick={() => setIsSignupModalOpen(true)}
            mt='md'
            variant='subtle'
            sx={(theme) => ({
              color: theme.colors.nbcGreen[0],
              justifyContent: 'flex-start',
              padding: 0,
              width: 'fit-content',
              ':hover': {
                background: 'transparent',
              },
            })}
          >
            Sign up
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Login;
