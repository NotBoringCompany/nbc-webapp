import { useMoralis } from 'react-moralis';
import { Container, Title, Text, Divider } from '@mantine/core';
import AuthForm from '@/components/Form/AuthForm';
import Layout from '@/components/Layout/Layout';

const Accountdashboard = () => {
  const { user } = useMoralis();
  const userEthAddress = user && user.attributes.ethAddress;
  const userHasEmail = user && !!user.attributes.email;
  return (
    <Layout withAuth>
      <Container maw='1024px' direction='column'>
        <Title
          weight='500'
          size='32px'
          mb='32px'
          sx={(theme) => ({
            color: theme.colors.nbcGreen[0],
          })}
        >
          Account Dashboard
        </Title>

        <Text
          weight='300'
          size='24px'
          mb='12px'
          sx={(theme) => ({
            color: theme.colors.nbcGreen[0],
          })}
        >
          Details
        </Text>

        {!!user && (
          <Text
            sx={(theme) => ({
              span: {
                color: theme.colors.nbcGreen[0],
                fontWeight: 500,
              },
            })}
          >
            Connected Wallet: <span>{userEthAddress}</span>
          </Text>
        )}
        {!!user && (
          <Text
            sx={(theme) => ({
              span: {
                color: theme.colors.nbcGreen[0],
                fontWeight: 500,
              },
            })}
          >
            Connected Email:{' '}
            {userHasEmail ? <span>{user.attributes.email}</span> : '-'}
          </Text>
        )}
        <Divider my='md' />
        <Text
          weight='300'
          size='24px'
          mb='12px'
          sx={(theme) => ({
            color: theme.colors.nbcGreen[0],
          })}
        >
          Email & Password
        </Text>
        <AuthForm />
      </Container>
    </Layout>
  );
};

export default Accountdashboard;
