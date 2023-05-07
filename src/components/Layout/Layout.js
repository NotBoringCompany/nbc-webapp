import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Flex, Loader, ScrollArea, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';
import { useMoralis, useChain } from 'react-moralis';
import { IconAlertOctagon } from '@tabler/icons';

const AuthWall = (
  <Flex direction='column' align='center' justify='center'>
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
      <Flex direction='row' align='center' justify='center'>
        <IconAlertOctagon
          color='#ca4242'
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
      <Text size='lg'>Please connect your wallet to access this page.</Text>
    </Box>
  </Flex>
);

const Layout = ({
  children,
  authWallComponent,
  withAuth = false,
  mustNotAuth = false,
  pageTitle,
  description = 'Building immersive Web3-native IP franchises.',
  keywords = 'realm hunter, multiplayer game, nft gaming, nft', // seo keywords, separated by commas
}) => {
  const { isAuthenticated, isAuthUndefined } = useMoralis();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authWall = !!authWallComponent ? authWallComponent : AuthWall;

  const title = !!pageTitle ? `${pageTitle} | Not Boring Company` : `Not Boring Company`;

  useEffect(() => {
    if (!isAuthUndefined) {
      if (isAuthenticated && mustNotAuth) {
        router.replace('/');
      }

      //Preventing "blip" screen / race condition. Hacky for now, should be polished next.
      // "Blip" here means showing the screen it's not supposed to show for a split second (1 seocnd or a bit less)
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
  }, [isAuthUndefined, isAuthenticated, mustNotAuth, router]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
      </Head>
      <Flex direction='column'>
        <MainNavbar />
        <ScrollArea h={'calc(100vh - 80px)'}>
          <Container
            sx={{
              width: '100%',
              maxWidth: '100%',
              position: 'relative',
            }}
            px={'40px'}
          >
            {loading ? (
              <Loader
                sx={{ position: 'absolute', left: '50%' }}
                color='green'
              />
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
    </>
  );
};

export default Layout;
