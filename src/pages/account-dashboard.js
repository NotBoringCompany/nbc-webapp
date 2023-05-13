import { useMoralis } from 'react-moralis';
import { Container, Text, Divider } from '@mantine/core';
import AuthForm from '@/components/Form/AuthForm';
import Layout from '@/components/Layout/Layout';
import { HeadingFour } from '@/components/Typography/Headings';

const Accountdashboard = () => {
  const { user } = useMoralis();
  const userEthAddress = user?.attributes?.ethAddress;
  const userHasEmail = user && !!user.attributes.email;
  return (
    <Layout
      pageTitle='Account Dashboard'
      description='See your account details here'
      withAuth
    >
      <Container maw='1024px' direction='column'>
        <HeadingFour mb={32}>Account Dashboard</HeadingFour>
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
