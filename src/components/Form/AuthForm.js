import { useForm } from '@mantine/form';
import { useMoralis } from 'react-moralis';
import { Text, TextInput, Button, Loader } from '@mantine/core';
import moralisErrorMessage from '@/utils/moralisErrorMessage';
import CryptoJS from 'crypto-js';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../Auth/AuthContext';

/**
 * `AuthForm` is used for logging in, for changing email/password, or for linking a user's account with email (if they used wallet)
 */
const AuthForm = ({ forLogin = false, changeEmail = false, changePassword = false, linkAccount = false, resetFormTrigger = false, setResetFormTrigger }) => {
  const {
    isAuthenticated,
    user,
    setUserData,
    isUserUpdating,
    isAuthenticating,
    authError,
    userError,
  } = useMoralis();
  const router = useRouter();

  const [isEmailUserAuthenticating, setIsEmailUserAuthenticating] = useState(false);

  const { login, emailUser, emailLoginError, setEmailLoginError, setEmailUser } = useContext(AuthContext);

  const hasEmail = user?.attributes?.email || !!emailUser;

  const [loading, setLoading] = useState(false);

  const [additionalError, setAdditionalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const initialValues = {
    currentEmail: '',
    newEmail: '',
    password: '',
    newPassword: '',
  }
  const form = useForm({
    initialValues: initialValues,

    validate: {
      currentEmail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      newEmail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // this needs to be stronger.
      password: (value) =>
        value.length >= 6 ? null : 'Password must have at least 6 characters',
    },
  });

  useEffect(() => {
    if (resetFormTrigger) {
      form.reset(initialValues);
      setResetFormTrigger(false);
    }
  }, [resetFormTrigger, setResetFormTrigger])

  // if the user is not logged in via Moralis (user) or email (emailUser) or it's not `forLogin`, return null
  if (!user && !emailUser && !forLogin) {
    return null;
  }

  const handleFormSubmit = async (formData) => {
    // reset any prior error messages to null first
    setAdditionalError(null);
    setLoading(true);
    const { currentEmail, newEmail, password, newPassword } = formData;

    if (!forLogin) {
      if (linkAccount) {
        // only allow linking an account if user is authenticated
        if (isAuthenticated && user) {
          const uniqueHash = CryptoJS.SHA256(
            CryptoJS.lib.WordArray.random(64).toString(CryptoJS.enc.Hex)
          );

          const hasUniqueHash = user?.get('uniqueHash');
          
          if (hasUniqueHash) {
            await setUserData({
              email: currentEmail,
              password: password,
            })
            .then(() => {
              setSuccessMessage('Successfully linked your account!');
              setTimeout(() => {
                router.reload();
              }, 2000);
            })
            .catch((err) => setAdditionalError(err.message));
          } else {
            await setUserData({
              email: currentEmail,
              password: password,
              uniqueHash: uniqueHash.toString(),
            })
            .then(() => {
              setSuccessMessage('Successfully linked your account!');
              setTimeout(() => {
                router.reload();
              }, 2000);
            })
            .catch((err) => setAdditionalError(err.message));
          }
        } else {
          setAdditionalError('Error with wallet authentication. Please try to log in with your wallet again.');
        }
      } else if (changeEmail) {
        if (emailUser ?? user?.get('email') ?? localStorage.getItem('email')) {
          const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/change-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: currentEmail,
              newEmail: newEmail,
              password: password,
            })
          });

          const { status, message, error, data } = await resp.json();

          if (status === 200) {
            setSuccessMessage('Successfully changed your email! A verification email has been sent to your new email.');
          } else {
            setAdditionalError(message);  
          }
        } else {
          setAdditionalError('Error with email authentication. Please try to log in with your email again.');
        }
      } else if (changePassword) {
        if (emailUser ?? user?.get('email') ?? localStorage.getItem('email')) {
          // TO DO -> ADD PASSWORD CHANGE FUNCTIONALITY
          console.log('password change functionality');
        } else {
          setAdditionalError('Error with email authentication. Please try to log in with your email again.');
        }
      }
    } else {
      try {
        setIsEmailUserAuthenticating(true);
        await login(email.toLowerCase(), password);
        setIsEmailUserAuthenticating(false);
      } catch (err) {
        setEmailLoginError(err.message);
      }
    }

    setLoading(false);
  };

  const hasEmailLeadText = <>Change your email and password.</>;
  // const doesntHaveEmailLeadText = (
  //   <>
  //     It seems like you haven{`'`}t connected your email yet. <br />
  //     <span>Connect your email and password</span> to easily log in next time.
  //   </>
  // );

  // const updateEmailPasswordLeadText = hasEmail && hasEmailLeadText;

  const forLoginLeadText = (
    <>Sign in to your account using your email and password OR create an account by clicking the &quot;Sign up&quot; button below.</>
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
        {forLogin && forLoginLeadText}
      </Text>
      <form
        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        // for some reason, `onSubmit` does not work if we set the button's type to `submit`. Thus, we're temporarily using the `onClick` functionality, which is essentially the same thing.
        onSubmit={form.onSubmit(handleFormSubmit)}
      >
        {!forLogin && changeEmail && (
          <>
            <TextInput
              my='sm'
              sx={(theme) => ({
                input: {
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
              label='Current Email'
              type='email'
              placeholder='Current Email'
              {...form.getInputProps('currentEmail')}
            />
            <TextInput
              my='sm'
              sx={(theme) => ({
                input: {
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
              label='New Email'
              type='email'
              placeholder='New Email'
              {...form.getInputProps('newEmail')}
            />
            <TextInput
              label='Password'
              sx={(theme) => ({
                input: {
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
          </>
        )}
        {!forLogin && changePassword && (
          <>
            <TextInput
              my='sm'
              sx={(theme) => ({
                input: {
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
              {...form.getInputProps('currentEmail')}
            />
            <TextInput
              my='sm'
              sx={(theme) => ({
                input: {
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
              label='Current Password'
              type='password'
              placeholder='Current Password'
              {...form.getInputProps('password')}
            />
            <TextInput
              label='New Password'
              sx={(theme) => ({
                input: {
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
              placeholder='New Password'
              {...form.getInputProps('newPassword')}
            />
          </>
        )}
        {!forLogin && linkAccount && (
          <>
            <TextInput
              my='sm'
              sx={(theme) => ({
                input: {
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
              label='Set Email'
              type='email'
              placeholder='Set Email'
              {...form.getInputProps('currentEmail')}
            />
            <TextInput
              label='Set Password'
              sx={(theme) => ({
                input: {
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
              placeholder='Set Password'
              {...form.getInputProps('password')}
            />
          </>
        )}
        {(forLogin || changeEmail || changePassword || linkAccount) && (
          <Button
            h='48px'
            miw='200px'
            disabled={loading}
            type='button'
            mt='lg'
            sx={{
              background: '#42ca9f',
              transitionDuration: '200ms',
              ':hover': {
                transform: 'scale(1.01) translate(1px, -3px)',
                backgroundColor: '#42ca9f',
              },
            }}
            onClick={() => handleFormSubmit(form.values)}
          >
            {loading ? (
              <Loader color='green' />
            ) : (
              <Text size='md'>
                {
                  forLogin ? 'Login' :
                    changeEmail ? 'Change email' :
                      changePassword ? 'Change password' :
                        linkAccount && 'Link account'
                }
              </Text>
            )}
          </Button>
        )}
        {!!successMessage && (
          <Text sx={{ color: '#42ca9f' }} mt='md'>
            {successMessage}
          </Text>
        )}
        {!!additionalError && (
          <Text sx={{ color: '#ca4242' }} mt='md'>
            {additionalError}
          </Text>
        )}
        {!!authError && forLogin && (
          <Text sx={{ color: '#ca4242' }} mt='md'>
            {moralisErrorMessage('auth', authError.code)}
          </Text>
        )}

        {!!userError && (
          <Text sx={{ color: '#ca4242' }} mt='md'>
            {userError.message}
          </Text>
        )}

        {emailLoginError && forLogin && (
          <Text sx={{ color: '#ca4242' }} mt='md'>
            {emailLoginError}
          </Text>
        )}
      </form>
    </>
  );
};

export default AuthForm;
