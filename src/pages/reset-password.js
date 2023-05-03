import { useState } from 'react';
import {
  Text,
  PasswordInput,
  Button,
  Loader,
  Flex,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Layout from '@/components/Layout/Layout';
import { apiGet, apiPost } from '@/utils/apiRequests';
import { serverSideRedirect } from '@/utils/redirects';
import Link from 'next/link';

export default function ResetPasssword({ data }) {
  const { resetPasswordToken } = data;
  //since we've checked on server-side,
  //at this point we're 100% sure that
  //the user has a valid reset password token
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const form = useForm({
    initialValues: { confirmNewPassword: '', newPassword: '' },

    validate: {
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords did not match' : null,
      newPassword: (value) =>
        value.length >= 6 ? null : 'Password must have at least 6 characters',
    },
  });

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    const { confirmNewPassword, newPassword } = formData;
    console.log(resetPasswordToken);
    try {
      await apiPost('backend-account/reset-password', {
        confirmNewPassword,
        newPassword,
        tokenId: resetPasswordToken,
      });
      setResetSuccess(true);
    } catch (e) {
      console.error(`Error in resetting user's password`, e);
      setHasError(true);
    }
    setLoading(false);
  };

  const successMessage = (
    <>
      <Text
        size='lg'
        sx={(theme) => ({
          color: theme.colors.nbcGreen[0],
          textAlign: 'center',
        })}
      >
        You{"'"}ve successfully reset your password!
      </Text>
      <Text
        size='lg'
        mt='md'
        sx={(theme) => ({
          textAlign: 'center',
          color: theme.colors.nbcGreen[0],
          a: {
            color: 'inherit',
          },
        })}
      >
        <Link href='/login'>Click here</Link> to login with your new credentials
      </Text>
    </>
  );
  const resetPasswordform = (
    <>
      <Text
        sx={(theme) => ({
          margin: 0,
          color: theme.colors.nbcGreen[0],
          fontWeight: 600,
          fontSize: 32,
        })}
      >
        Reset Password
      </Text>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <PasswordInput
          my='sm'
          sx={(theme) => ({
            '.mantine-PasswordInput-input': {
              marginTop: 8,
              padding: '24px 16px',
              maxWidth: '440px',
              border: `${theme.colors.nbcGreen[0]} 2px solid`,
              borderRadius: '8px',
            },
            ':mantine-Input-rightSection': {
              right: 8,
            },
            input: {
              padding: 24,
              width: '100%',
              padding: '24px 16px',
              ':focus': {
                border: 'none',
              },
            },
          })}
          name='newPassword'
          label='New password'
          placeholder='Password'
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          sx={(theme) => ({
            '.mantine-PasswordInput-input': {
              marginTop: 8,
              padding: '24px 16px',
              maxWidth: '440px',
              border: `${theme.colors.nbcGreen[0]} 2px solid`,
              borderRadius: '8px',
            },
            ':mantine-Input-rightSection': {
              right: 8,
            },
            input: {
              padding: 24,
              width: '100%',
              padding: '24px 16px',
              ':focus': {
                border: 'none',
              },
            },
          })}
          label='Confirm new password'
          name='confirmNewPassword'
          placeholder='Confirm password'
          {...form.getInputProps('confirmNewPassword')}
        />

        {hasError && (
          <Text
            sx={(theme) => ({ color: theme.colors.nbcRed[0] })}
            size={'sm'}
            mt='md'
          >
            There was a problem in resetting your password, please try again
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
    <Layout mustNotAuth>
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
        {resetSuccess ? successMessage : resetPasswordform}
      </Flex>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const resetPasswordToken = ctx.query.rtk;

  if (!resetPasswordToken) {
    //if has no "rtk" param
    return serverSideRedirect('/login');
  }

  //checks if reset password token is valid
  try {
    await apiGet(
      `backend-account/reset-password-token-check/${resetPasswordToken}`
    );
    return {
      props: {
        data: {
          resetPasswordToken,
        },
      },
    };
  } catch (e) {
    //if invalid
    console.error(e);
    return serverSideRedirect('/login');
  }
}
