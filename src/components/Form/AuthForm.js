import { useForm } from '@mantine/form';
import { useMoralis } from 'react-moralis';
import { Text, TextInput, Button, Loader } from '@mantine/core';

/**
 * `AuthForm` renders in 2 different "styles":
 * 1. When user has email and password already set / linked to their wallet - it'll show as "Change email & password"
 * 2. When user has neither email and password set / linked to their wallet, it'll show as "Set / link email & password"
 *
 */
const AuthForm = () => {
  const { isAuthenticated, user, setUserData, isUserUpdating } = useMoralis();
  const hasEmail = user && user.attributes.email;

  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6 ? null : 'Password must have at least 6 characters',
    },
  });

  if (!user) {
    return null;
  }

  const handleFormSubmit = async (formData) => {
    const { email, password } = formData;
    if (isAuthenticated && user) {
      await setUserData({ email, password });
    }
  };

  const hasEmailLeadText = <>Change your email and password</>;
  const doesntHaveEmailLeadText = (
    <>
      It seems like you haven{`'`}t connected your email yet. <br />
      <span>Connect your email and password</span> to easily log in next time.
    </>
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
        {!hasEmail ? doesntHaveEmailLeadText : hasEmailLeadText}
      </Text>
      <form sx onSubmit={form.onSubmit(handleFormSubmit)}>
        <TextInput
          my="sm"
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
          label="Email"
          type="email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Password"
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
          type="password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />

        <Button
          h="48px"
          miw="200px"
          disabled={isUserUpdating}
          type="submit"
          mt="lg"
          sx={{
            background: '#42ca9f',
            transitionDuration: '200ms',
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              backgroundColor: '#42ca9f',
            },
          }}
        >
          {isUserUpdating ? (
            <Loader color="green" />
          ) : (
            <Text size="md">
              {hasEmail ? `Change` : `Set`} Email & Password
            </Text>
          )}
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
