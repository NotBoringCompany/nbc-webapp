import { Box, Flex, Loader, ScrollArea, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';
import { useMoralis } from 'react-moralis';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';

const AuthWall = (
  <Flex direction="column" align="center" justify="center">
    <Box
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        width: '50%',
        border: '2px solid #ca4242',
        padding: '20px',
        textAlign: 'center',
        marginTop: 30,
      })}
    >
      <Flex direction="row" align="center" justify="center">
        <IconAlertOctagon
          color="#ca4242"
          size={40}
          style={{ marginRight: 10 }}
        />
        <Text
          sx={(theme) => ({
            fontSize: 40,
            color: '#ca4242',
            fontWeight: 700,
          })}
        >
          YOU ARE NOT LOGGED IN
        </Text>
      </Flex>
      <Text size="lg">Please connect your wallet to access this page.</Text>
    </Box>
  </Flex>
);

const Layout = ({
  children,
  authWallComponent,
  withAuth = false,
  mustNotAuth = false,
}) => {
  const { isAuthenticated, isAuthUndefined, isAuthenticating, user, is } =
    useMoralis();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authWall = !!authWallComponent ? authWallComponent : AuthWall;

  useEffect(() => {
    if (!isAuthUndefined) {
      if (isAuthenticated && mustNotAuth) {
        router.replace('/');
      }

      setLoading(false);
    }
  }, [isAuthUndefined, isAuthenticated, mustNotAuth, router]);

  return (
    <Flex direction="column">
      <MainNavbar />
      <ScrollArea h={'85vh'}>
        <Container
          sx={{
            width: '100%',
            maxWidth: '100%',
            position: 'relative',
          }}
          px={'40px'}
        >
          {loading ? (
            <Loader sx={{ position: 'absolute', left: '50%' }} color="green" />
          ) : (
            <>
              {' '}
              {withAuth ? (
                <>{isAuthenticated ? children : authWall}</>
              ) : (
                children
              )}
            </>
          )}
        </Container>
      </ScrollArea>
    </Flex>
  );
};

export default Layout;
