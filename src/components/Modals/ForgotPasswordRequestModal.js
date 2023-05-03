import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Text, Loader } from '@mantine/core';
import { apiPost } from '@/utils/apiRequests';

const ForgotPasswordRequestModal = ({ isOpen = false, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resetStates = () => {
    setLoading(false);
    setEmailSent(false);
    setHasError(false);
  };

  const form = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const { email } = formData;
      await apiPost('backend-account/reset-password-request', { email });
      setEmailSent(true);
    } catch (e) {
      console.error('Error requesting password reset link', e);
      setHasError(true);
    }
    setLoading(false);
  };

  const successMessage = (
    <Text sx={(theme) => ({ color: theme.colors.nbcGreen[0] })}>
      The link to reset your password has been sent! <br /> Please check your
      email.
    </Text>
  );

  const requestForm = (
    <>
      <Text>
        Please enter your email. If your email is associated with an account,{' '}
        <strong>we will send you a link to reset your password.</strong>
      </Text>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <TextInput
          my='sm'
          sx={(theme) => ({
            input: {
              maxWidth: '400px',
              width: '100%',
              marginTop: '4px',
              padding: '24px 16px',
              border: `${theme.colors.nbcGreen[0]} 2px solid`,
              borderRadius: '8px',
              ':focus': {
                border: '2px solid #42ca9f',
              },
            },
          })}
          label='Email'
          type='email'
          placeholder='Email'
          {...form.getInputProps('email')}
        />
        {hasError && (
          <Text
            sx={(theme) => ({ color: theme.colors.nbcRed[0] })}
            size={'sm'}
            mt='md'
          >
            There was a problem in sending you the link, please try again.
          </Text>
        )}
        <Button
          h='48px'
          miw='200px'
          disabled={loading}
          type='submit'
          mt='lg'
          sx={{
            background: '#42ca9f',
            transitionDuration: '200ms',
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              backgroundColor: '#42ca9f',
            },
          }}
        >
          {loading ? <Loader color='green' /> : <Text size='md'>Reset</Text>}
        </Button>
      </form>
    </>
  );

  return (
    <Modal
      centered
      title={<Text size={24}>Reset</Text>}
      opened={isOpen}
      onClose={() => {
        onClose();
        resetStates();
      }}
      size={'md'}
    >
      {emailSent ? successMessage : requestForm}
    </Modal>
  );
};

export default ForgotPasswordRequestModal;
