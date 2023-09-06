import { useForm } from '@mantine/form';
import { useMoralis } from 'react-moralis';
import { Text, TextInput, Button, Loader, Flex } from '@mantine/core';
import moralisErrorMessage from '@/utils/moralisErrorMessage';
import CryptoJS from 'crypto-js';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../Auth/AuthContext';
import { validChecksum } from '@/utils/checksum';
import { IconCircleCheck, IconCircleX } from '@tabler/icons';

/**
 * `AuthForm` is used for logging in, for changing email/password, or for linking a user's account with email (if they used wallet)
 */
const AuthForm = ({
  forLogin = false,
  changeEmail = false,
  changePassword = false,
  linkAccount = false,
  linkWallet = false,
  resetFormTrigger = false,
  setResetFormTrigger
}) => {
  const {
    isAuthenticated,
    user,
    setUserData,
    isUserUpdating,
    isAuthenticating,
    authError,
    userError,
    enableWeb3,
    isWeb3Enabled,
    Moralis
  } = useMoralis();
  const router = useRouter();

  const [isEmailUserAuthenticating, setIsEmailUserAuthenticating] = useState(false);

  const { login, emailUser, emailLoginError, setEmailLoginError, setEmailUser, logout } = useContext(AuthContext);
  const { logout: moralisLogout } = useMoralis();

  const hasEmail = user?.attributes?.email || !!emailUser;

  const [loading, setLoading] = useState(false);

  const [additionalError, setAdditionalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // required for `linkAccount`
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // required for `changePassword`
  const [newPasswordRequirements, setNewPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const passwordRequirementsMet =
    passwordRequirements.length &&
    passwordRequirements.lowercase &&
    passwordRequirements.uppercase &&
    passwordRequirements.number &&
    passwordRequirements.special;

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
      password: (value) => (value.length < 8 ? 'Password must have at least 8 characters' : null),
      // this needs to be stronger.
      newPassword: (value) => {
        if (value.length < 8) {
          return 'Password must have at least 8 characters';
        }
        if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value)) {
          return 'Password must include lowercase, uppercase, numbers, and special symbols';
        }
        if (value.includes('commonword') || value.includes('useremail')) {
          return 'Avoid using common words or personal information';
        }
        // TO DO: Check against common password databases
        // Implement this part using a relevant library or service
        // Example: if (isPasswordCompromised(value)) return 'Password has been compromised';
        return null;
      },
      wallet: (value) => (!validChecksum(value) ? 'Invalid wallet address' : null),
    },
  });

  useEffect(() => {
    if (resetFormTrigger) {
      form.reset(initialValues);
      setResetFormTrigger(false);
    }
  }, [resetFormTrigger, setResetFormTrigger])

  useEffect(() => {
    const checkPasswordRequirements = async () => {
      const { password } = form.values;
      const meetsLength = password.length >= 8;
      const meetsLowercase = /[a-z]/.test(password);
      const meetsUppercase = /[A-Z]/.test(password);
      const meetsNumber = /[0-9]/.test(password);
      const meetsSpecial = /[!@#$%^&*]/.test(password);

      setPasswordRequirements({
        length: meetsLength,
        lowercase: meetsLowercase,
        uppercase: meetsUppercase,
        number: meetsNumber,
        special: meetsSpecial,
      })
    }

    checkPasswordRequirements();
  }, [form.values])

  useEffect(() => {
    const checkPasswordRequirementsNew = async () => {
      const { newPassword } = form.values;
      const meetsLength = newPassword.length >= 8;
      const meetsLowercase = /[a-z]/.test(newPassword);
      const meetsUppercase = /[A-Z]/.test(newPassword);
      const meetsNumber = /[0-9]/.test(newPassword);
      const meetsSpecial = /[!@#$%^&*]/.test(newPassword);

      setNewPasswordRequirements({
        length: meetsLength,
        lowercase: meetsLowercase,
        uppercase: meetsUppercase,
        number: meetsNumber,
        special: meetsSpecial,
      })
    }

    checkPasswordRequirementsNew();
  }, [form.values])

  console.log(form.values);

  // if the user is not logged in via Moralis (user) or email (emailUser) or it's not `forLogin`, return null
  if (!user && !emailUser && !forLogin) {
    return null;
  }

  const handleFormSubmit = async (formData) => {
    // reset any prior error messages to null first
    setAdditionalError(null);
    setLoading(true);
    const { currentEmail, newEmail, password, newPassword, wallet } = formData;

    if (!forLogin) {
      if (linkAccount) {
        // only allow linking an account if user is authenticated
        if (isAuthenticated && user) {
          const uniqueHash = CryptoJS.SHA256(
            CryptoJS.lib.WordArray.random(64).toString(CryptoJS.enc.Hex)
          );

          const hasUniqueHash = user?.get('uniqueHash');

          const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/check-user-exists/${currentEmail}`);

          const { status, message, error, data } = await resp.json();

          if (status === 200) {
            if (data?.userExists) {
              setAdditionalError('An account with that email already exists.');
            } else {
              if (hasUniqueHash) {
                await setUserData({
                  email: currentEmail,
                  password: password,
                })
                  .then(() => {
                    setSuccessMessage('Successfully linked your account! You will now be required to authenticate with Metamask upon refreshing.');
                    setTimeout(() => {
                      router.reload();
                    }, 3000);
                  })
                  .catch((err) => setAdditionalError(err.message));
              } else {
                await setUserData({
                  email: currentEmail,
                  password: password,
                  uniqueHash: uniqueHash.toString(),
                })
                  .then(() => {
                    setSuccessMessage('Successfully linked your account! You will now be required to authenticate with Metamask upon refreshing.');
                    setTimeout(() => {
                      router.reload();
                    }, 3000);
                  })
                  .catch((err) => setAdditionalError(err.message));
              }
            }
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
          const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/change-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user?.get('email') || emailUser || localStorage.getItem('email'),
              password: password,
              newPassword: newPassword,
            })
          });

          const { status, message, error, data } = await resp.json();

          if (status === 200) {
            setSuccessMessage('Successfully changed your password! Redirecting...');
            setTimeout(async () => {
              await logout();
              await moralisLogout();
            }, 2000)
          } else {
            setAdditionalError(message);
          }
          console.log('password change functionality');
        } else {
          setAdditionalError('Error with email authentication. Please try to log in with your email again.');
        }
      } else if (linkWallet) {
        if (emailUser ?? user?.get('email') ?? localStorage.getItem('email')) {
          try {
            const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/link-wallet`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user?.get('email') || emailUser || localStorage.getItem('email'),
                password: password,
                wallet: wallet,
              })
            });

            const { status, message, error, data } = await resp.json();

            if (status === 200) {
              setSuccessMessage('Successfully linked your wallet! You will now be required to authenticate with Metamask upon refreshing.');
              setTimeout(() => {
                router.reload();
              }, 3000);
            } else {
              setAdditionalError(message);
            }
          } catch (err) {
            setAdditionalError(err.message);
          }
        }
      }
    } else {
      try {
        setIsEmailUserAuthenticating(true);
        await login(currentEmail.toLowerCase(), password);
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
            <Text sx={(theme) => ({
              marginTop: 10,
            })}>Password requirements:</Text>
            <Flex
              align='center'
            >
              {newPasswordRequirements.length ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={newPasswordRequirements.length ? '#42ca9f' : '#ca4242'}>At least 8 characters</Text>
            </Flex>
            <Flex
              align='center'
            >
              {(newPasswordRequirements.lowercase && newPasswordRequirements.uppercase) ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={(newPasswordRequirements.lowercase && newPasswordRequirements.uppercase) ? '#42ca9f' : '#ca4242'}>Includes lower and upper case characters</Text>
            </Flex>
            <Flex
              align='center'
            >
              {newPasswordRequirements.number ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={newPasswordRequirements.number ? '#42ca9f' : '#ca4242'}>At least 1 number</Text>
            </Flex>
            <Flex
              align='center'
            >
              {newPasswordRequirements.special ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={newPasswordRequirements.special ? '#42ca9f' : '#ca4242'}>At least 1 special character</Text>
            </Flex>
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
            <Text sx={(theme) => ({
              marginTop: 10,
            })}>Password requirements:</Text>
            <Flex
              align='center'
            >
              {passwordRequirements.length ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={passwordRequirements.length ? '#42ca9f' : '#ca4242'}>At least 8 characters</Text>
            </Flex>
            <Flex
              align='center'
            >
              {(passwordRequirements.lowercase && passwordRequirements.uppercase) ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={(passwordRequirements.lowercase && passwordRequirements.uppercase) ? '#42ca9f' : '#ca4242'}>Includes lower and upper case characters</Text>
            </Flex>
            <Flex
              align='center'
            >
              {passwordRequirements.number ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={passwordRequirements.number ? '#42ca9f' : '#ca4242'}>At least 1 number</Text>
            </Flex>
            <Flex
              align='center'
            >
              {passwordRequirements.special ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />}
              <Text ml={10} color={passwordRequirements.special ? '#42ca9f' : '#ca4242'}>At least 1 special character</Text>
            </Flex>
          </>
        )}
        {!forLogin && linkWallet && (
          <>
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
            <TextInput
              label='Set Wallet'
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
              type='text'
              placeholder='Set Wallet'
              {...form.getInputProps('wallet')}
            />
          </>
        )}
        {forLogin && (
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
        {(forLogin || changeEmail || changePassword || linkAccount || linkWallet) && (
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
                        linkAccount ? 'Link account' :
                          linkWallet && 'Link wallet'
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
        {/* {!!authError && forLogin && (
          <Text sx={{ color: '#ca4242' }} mt='md'>
            {moralisErrorMessage('auth', authError.code)}
          </Text>
        )} */}

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
