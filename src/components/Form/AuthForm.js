import { useForm } from '@mantine/form';
import { useMoralis } from 'react-moralis';
import { Text, TextInput, Button, Loader } from '@mantine/core';
import moralisErrorMessage from '@/utils/moralisErrorMessage';
import CryptoJS from 'crypto-js';

/**
 * `AuthForm` renders in 3 different "styles" with 2 different "behaviours":
 * 1. When user has email and password already set / linked to their wallet - it'll show as "Change email & password" (behaviour 1)
 * 2. When user has neither email and password set / linked to their wallet, it'll show as "Set / link email & password" (behaviour 1)
 * 3. When using `forLogin`, then it'll act as a login form (behaviour 2)
 *
 */
const AuthForm = ({ forLogin = false }) => {
  const {
    isAuthenticated,
    user,
    setUserData,
    isUserUpdating,
    login,
    isAuthenticating,
    authError,
  } = useMoralis();
  const hasEmail = user?.attributes?.email;

  const loading = isUserUpdating || isAuthenticating;

  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6 ? null : 'Password must have at least 6 characters',
    },
  });

  if (!user && !forLogin) {
    return null;
  }

  const handleFormSubmit = async (formData) => {
    const { email, password } = formData;
    if (!forLogin) {
      if (isAuthenticated && user) {
        const uniqueHash = CryptoJS.SHA256(
          CryptoJS.lib.WordArray.random(64).toString(CryptoJS.enc.Base64)
        );

        await setUserData({
          email: email,
          password: password,
          uniqueHash: uniqueHash.toString(),
        });
      }
    } else {
      await login(email, password);
    }
  };

  const hasEmailLeadText = <>Change your email and password.</>;
  const doesntHaveEmailLeadText = (
    <>
      It seems like you haven{`'`}t connected your email yet. <br />
      <span>Connect your email and password</span> to easily log in next time.
    </>
  );

  const updateEmailPasswordLeadText = !hasEmail
    ? doesntHaveEmailLeadText
    : hasEmailLeadText;

  const forLoginLeadText = (
    <>Sign in into your account using your email and password</>
  );

  return (
    <>
      <Text
        sx={(theme) => ({
          span: {
            color: theme.colors.nbcGreen[0],
            fontWeight: 500,
          },
        })}
        size={'md'}
      >
        {forLogin ? forLoginLeadText : updateEmailPasswordLeadText}
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
        <TextInput
          label='Password'
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
          type='password'
          placeholder='Password'
          {...form.getInputProps('password')}
        />

        {!!authError && forLogin && (
          <Text sx={{ color: '#ca4242' }} mt='md'>
            {moralisErrorMessage('auth', authError.code)}
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
          {loading ? (
            <Loader color='green' />
          ) : (
            <Text size='md'>
              {forLogin ? (
                'Login'
              ) : (
                <>{hasEmail ? `Change` : `Set`} Email & Password</>
              )}
            </Text>
          )}
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
