import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { Box, Button, Flex, Text, createStyles } from '@mantine/core';
import { IconAlertOctagon, IconCheck, IconCircleX } from '@tabler/icons';
import { useMoralis } from 'react-moralis';
import { useCallback, useContext, useEffect, useState } from 'react';
import { HeadingThree } from '@/components/Typography/Headings';
import AuthContext from '@/components/Auth/AuthContext';

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
  // checks if the user has AT LEAST 1 key of salvation
  const [hasKey, setHasKey] = useState(false);
  // checks if the user has access to an Alpha V1 invite code
  const [hasInviteCode, setHasInviteCode] = useState(false);
  const { classes } = useStyles();

  const { isEmailAuthenticated, emailUser } = useContext(AuthContext);

  const ownsKey = useCallback(async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/owner-ids/${user?.attributes?.ethAddress}`
    );
    const res = await rawRes.json();

    setHasKey(res.data?.ownerIds?.length > 0);
  }, [user]);

  const ownsInviteCode = useCallback(async () => {
    const resp = await fetch(
      `https://nbc-webapp-api-ts-production.up.railway.app/backend-account/owns-alpha-invite-code/${emailUser || user?.attributes?.email}`
    );

    const { status, message, error, data } = await resp.json();

    if (status === 200) {
      setHasInviteCode(data.hasInviteCode);
    }
  }, [emailUser, user?.attributes?.email])

  useEffect(() => {
    ownsKey();
  }, [ownsKey, user]);

  useEffect(() => {
    ownsInviteCode();
  }, [ownsInviteCode]);

  const emailConnected = !!(user && user.get('email')) || emailUser;

  return (
    <>
      <Layout dragonBackground>
        <Flex className={classes.container}>
          <Box className={classes.ctaContainer}>
            <Flex align='center' justify='center' direction='column'>
              <HeadingThree color='white' mb={20} order={1}>
                REALM HUNTER: ALPHA RELEASE V1.0
              </HeadingThree>
              <Text
                size={24}
                weight={500}
                sx={(theme) => ({
                  lineHeight: 1,
                })}
              >
                Alpha V1.0 (PC & Mac) is now out!
              </Text>
              <Text size={16} weight={500} italic mt={5}>
                You are required to redeem an invite code or have a Key Of Salvation <br /> to gain access to the alpha.
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
              {(hasKey || hasInviteCode) ? (
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
              <Text size={18} color={(hasKey || hasInviteCode) ? '#42ca9f' : '#e9d562'}>
                {emailConnected ? hasKey ? 'At least 1 Key Of Salvation owned' : hasInviteCode ? 'Owns an Alpha V1 invite code' : 'At least 1 Key Of Salvation or an Alpha V1 invite code' : 'At least 1 Key Of Salvation or an Alpha V1 invite code'}
              </Text>
            </Flex>
            <Text size={15} mt={30}>
              *Note: The link is available to the public, {' '}
              <strong>
                <br />
                however you are required EITHER 1 Key Of Salvation or an invite code to PLAY the alpha.
              </strong>
            </Text>
            <Text size={20} mt={50}>
              Do you have an invite code to play the Alpha?{' '}<br />
            </Text>
            <Text size={20}>
              Redeem your code <Link href='/account/redeem-code' style={{color: '#42ca9f'}}>here</Link>.
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
