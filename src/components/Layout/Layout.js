import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';
import { useMoralis } from 'react-moralis';
import WarningBox from './WarningBox';

const AuthWall = (
  <Flex justify='center'>
    <WarningBox
      title='YOU ARE NOT LOGGED IN'
      description='Please connect your wallet to access this page.'
    />
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

  const title = !!pageTitle
    ? `${pageTitle} | Not Boring Company`
    : `Not Boring Company`;

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
