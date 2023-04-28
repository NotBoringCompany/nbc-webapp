import AuthForm from '@/components/Form/AuthForm';
import Layout from '@/components/Layout/Layout';
import { Flex, Title } from '@mantine/core';

const Login = () => {
  return (
    <Layout mustNotAuth>
      <Flex
        direction="column"
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
        <Title
          sx={(theme) => ({
            margin: 0,
            marginBottom: '8px',
            color: theme.colors.nbcGreen[0],
            fontWeight: 700,
          })}
        >
          Log In
        </Title>
        <AuthForm forLogin />
      </Flex>
    </Layout>
  );
};

export default Login;
