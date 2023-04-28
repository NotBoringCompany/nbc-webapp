import { useForm } from '@mantine/form';
import { useMoralis } from 'react-moralis';
import { Text, TextInput, Button, Loader } from '@mantine/core';

const AuthForm = () => {
  const { isAuthenticated, user, login, setUserData, isUserUpdating } =
    useMoralis();

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
  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <TextInput
        my="sm"
        sx={{
          input: {
            marginTop: '4px',
            padding: '24px 16px',
            border: '#42ca9f 2px solid',
            ':focus': {
              border: '2px solid #42ca9f',
            },
          },
        }}
        label="Email"
        type="email"
        placeholder="Email"
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Password"
        sx={{
          input: {
            marginTop: '4px',
            padding: '24px 16px',
            border: '#42ca9f 2px solid',
            ':focus': {
              border: '2px solid #42ca9f',
            },
          },
        }}
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
          <Text size="md">Set Email & Password</Text>
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
