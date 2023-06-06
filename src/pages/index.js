import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { Box, Button, Flex, Text, createStyles } from '@mantine/core';
import { IconAlertOctagon, IconCheck, IconCircleX } from '@tabler/icons';
import { useMoralis } from 'react-moralis';
import { useCallback, useEffect, useState } from 'react';
import { HeadingThree } from '@/components/Typography/Headings';

const useStyles = createStyles((theme) => ({
  container: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  ctaContainer: {
    marginRight: '64px',
    textAlign: 'center',
    padding: theme.spacing.md,
    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },
}));

export default function Home() {
  const { isAuthenticated, user } = useMoralis();
  const emailConnected = !!(user && user.get('email'));
  // checks if the user has AT LEAST 1 key of salvation
  const [hasKey, setHasKey] = useState(false);
  const { classes } = useStyles();

  const ownsKey = useCallback(async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/owner-ids/${user?.attributes?.ethAddress}`
    );
    const res = await rawRes.json();

    setHasKey(res.data?.ownerIds?.length > 0);
  }, [user]);

  useEffect(() => {
    ownsKey();
  }, [ownsKey, user]);

  return (
    <>
      <Layout dragonBackground>
        <Flex className={classes.container}>
          <Box className={classes.ctaContainer}>
            <Flex align='center' justify='center' direction='column'>
              <HeadingThree color='white' mb={20} order={1}>
                REALM HUNTER: ALPHA RELEASE
              </HeadingThree>
              <Text
                size={24}
                weight={500}
                sx={(theme) => ({
                  lineHeight: 1,
                })}
              >
                Alpha V1.0 (PC) is now out for Key Of Salvation holders!
              </Text>
              <Text size={16} weight={500} italic mt={5}>
                Mac build will be released soon.
              </Text>

              <Link
                href={`${
                  emailConnected
                    ? `https://docsend.com/view/tagec29a4mvuwwy5`
                    : `#`
                }`}
                download={emailConnected ? true : false}
                target={emailConnected ? '_blank' : '_self'}
              >
                <Button
                  sx={(theme) => ({
                    backgroundColor: emailConnected
                      ? theme.colors.nbcGreen
                      : theme.colors.gray[7],
                    cursor: emailConnected ? 'pointer' : 'not-allowed',
                    marginTop: 24,
                    height: '50px',
                    fontSize: 18,
                    color: emailConnected ? '#fff' : '#000',
                    transitionDuration: '200ms',
                    ':hover': {
                      transform: emailConnected
                        ? 'scale(1.01) translate(1px, -3px)'
                        : 'none',
                      backgroundColor: emailConnected
                        ? theme.colors.nbcGreen
                        : theme.colors.gray[7],
                    },
                    [theme.fn.smallerThan('lg')]: {
                      fontSize: 16,
                    },
                    [theme.fn.smallerThan('sm')]: {
                      fontSize: 12,
                    },
                  })}
                >
                  TAKE ME TO THE ALPHA!
                </Button>
              </Link>
            </Flex>
          </Box>
          <Box
            sx={(theme) => ({
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: theme.radius.md,
              padding: theme.spacing.md,
              textAlign: 'center',
            })}
          >
            <Flex direction='row' align='center' justify='center'>
              <IconAlertOctagon size={30} style={{ marginRight: 15 }} />
              <Text size={20} weight={600}>
                FOLLOW THESE STEPS TO GAIN ACCESS TO THE ALPHA
              </Text>
            </Flex>
            <Flex direction='row' align='center' justify='center' mt={30}>
              {isAuthenticated ? (
                <IconCheck
                  size={30}
                  style={{ marginRight: 15 }}
                  color='#42ca9f'
                />
              ) : (
                <IconCircleX
                  size={30}
                  style={{ marginRight: 15 }}
                  color='#ca4242'
                />
              )}
              <Text size={18} color={isAuthenticated ? '#42ca9f' : '#ca4242'}>
                {isAuthenticated ? 'Wallet connected' : 'Connect your wallet'}
              </Text>
            </Flex>
            <Flex direction='row' align='center' justify='center' mt={10}>
              {emailConnected ? (
                <IconCheck
                  size={30}
                  style={{ marginRight: 15 }}
                  color='#42ca9f'
                />
              ) : (
                <IconCircleX
                  size={30}
                  style={{ marginRight: 15 }}
                  color='#ca4242'
                />
              )}
              <Text size={18} color={emailConnected ? '#42ca9f' : '#ca4242'}>
                {emailConnected
                  ? 'Email connected'
                  : 'Connect your email to your wallet'}
              </Text>
            </Flex>
            <Flex direction='row' align='center' justify='center' mt={10}>
              {hasKey ? (
                <IconCheck
                  size={30}
                  style={{ marginRight: 15 }}
                  color='#42ca9f'
                />
              ) : (
                <IconCircleX
                  size={30}
                  style={{ marginRight: 15 }}
                  color='#e9d562'
                />
              )}
              <Text size={18} color={hasKey ? '#42ca9f' : '#e9d562'}>
                {emailConnected
                  ? 'At least 1 Key Of Salvation owned'
                  : 'Own at least 1 Key Of Salvation*'}
              </Text>
            </Flex>
            <Text size={15} mt={30}>
              *Note: You don{"'t"} need a Key to gain access to the download
              link,{' '}
              <strong>
                <br />
                however you are required to own AT LEAST 1 Key to log in and
                play the alpha.
              </strong>
            </Text>
          </Box>
        </Flex>
      </Layout>

      {/* <Image
        src={XDragon}
        alt='XDragon'
        fill
        style={{ zIndex: -999, opacity: '75%' }}
      /> */}
    </>
  );
}
