import Layout from '@/components/Layout/Layout';
import { Box, Button, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconCheck, IconCircleX } from '@tabler/icons';
import { useMoralis } from 'react-moralis';
import { useCallback, useEffect, useState } from 'react';
import XDragon from '../../public/xandrius07-color.png'
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { isAuthenticated, user } = useMoralis();
  const emailConnected = user && user.get('emailAddress') !== null;
  // checks if the user has AT LEAST 1 key of salvation.
  const [hasKey, setHasKey] = useState(false);

  const ownsKey = useCallback(async () => {
    const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/owner-ids/${user && user.attributes.ethAddress}`);
    const res = await rawRes.json();

    setHasKey(res.data?.ownerIds?.length > 0);
  }, [user])

  useEffect(() => {
    ownsKey();
  }, [ownsKey, user])

  return (
    <>
    <Layout>
      <Flex
        align='center'
        justify='space-between'
        direction='row'
        h={'calc(100vh - 150px)'}
      >
        <Box
          sx={(theme) => ({
            padding: theme.spacing.md,
            textAlign: 'center',
            marginTop: 45,
            width: '60%',
          })}
        >
          <Flex
            align='center'
            justify='center'
            direction='column'
          >
            <Text size={48} weight={700} color='white' mb={20} sx={(theme) => ({
              lineHeight: 1,
            })}>
              REALM HUNTER: ALPHA RELEASE
            </Text>
            <Text size={24} weight={500} sx={(theme) => ({
              lineHeight: 1,
            })}>
              Alpha V1.0 (PC) is now out for Key Of Salvation holders!
            </Text>
            <Text size={16} weight={500} italic mt={5}>
              Mac build will be released soon.
            </Text>
            {!emailConnected && (
              <Button 
                sx={(theme) => ({
                  backgroundColor: '#42ca9f',
                  marginTop: 50,
                  marginRight: 30,
                  height: '50px',
                  fontSize: 18,
                  ':hover': {
                    transform: 'scale(1.01) translate(1px, -3px)',
                    transitionDuration: '200ms',
                    backgroundColor: '#42ca9f',
                  },
                  [theme.fn.smallerThan('lg')]: {
                    fontSize: 16,
                  },
                  [theme.fn.smallerThan('sm')]: {
                    fontSize: 12,
                  }
                })}
                disabled
              >
                TAKE ME TO THE ALPHA!
              </Button>
            )}
            {emailConnected && (
              <Link href='https://drive.google.com/uc?export=download&id=1pwUtL1zikJYm6Tt_Iv36E7qI2FHJrU9X' download target='_blank'>
                <Button 
                  sx={(theme) => ({
                    backgroundColor: '#42ca9f',
                    marginTop: 50,
                    marginRight: 30,
                    height: '50px',
                    fontSize: 18,
                    ':hover': {
                      transform: 'scale(1.01) translate(1px, -3px)',
                      transitionDuration: '200ms',
                      backgroundColor: '#42ca9f',
                    },
                    [theme.fn.smallerThan('lg')]: {
                      fontSize: 16,
                    },
                    [theme.fn.smallerThan('sm')]: {
                      fontSize: 12,
                    }
                  })}
                >
                  TAKE ME TO THE ALPHA!
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
        <Box
          px={50}
          py={30}
          sx={(theme) => ({
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 45,
            width: '50%',
          })}
          ml={30}
        >
          <Flex
            direction='row'
            align='center'
            justify='center'
          >
            <IconAlertOctagon size={30} style={{marginRight: 15}} />
            <Text size={20} weight={600}>FOLLOW THESE STEPS TO GAIN ACCESS TO THE ALPHA</Text>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='center'
            mt={30}
          >
            {isAuthenticated ? <IconCheck size={30} style={{marginRight: 15}} color='#42ca9f' /> : <IconCircleX size={30} style={{marginRight: 15}} color='#ca4242' />}
            <Text size={18} color={isAuthenticated ? '#42ca9f' : '#ca4242'}>{isAuthenticated ? 'Wallet connected' : 'Connect your wallet'}</Text>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='center'
            mt={10}
          >
            {emailConnected ? <IconCheck size={30} style={{marginRight: 15}} color='#42ca9f' /> : <IconCircleX size={30} style={{marginRight: 15}} color='#ca4242' />}
            <Text size={18} color={emailConnected ? '#42ca9f' : '#ca4242'}>{emailConnected ? 'Email connected' : 'Connect your email to your wallet'}</Text>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='center'
            mt={10}
          >
            {hasKey ? <IconCheck size={30} style={{marginRight: 15}} color='#42ca9f' /> : <IconCircleX size={30} style={{marginRight: 15}} color='#e9d562' />}
            <Text size={18} color={hasKey ? '#42ca9f' : '#e9d562'}>{emailConnected ? 'At least 1 Key Of Salvation owned' : 'Own at least 1 Key Of Salvation*'}</Text>
          </Flex>
          <Text size={15} mt={30}>*Note: You don{"'t"} need a Key to gain access to the download link, <strong><br />however you are required to own AT LEAST 1 Key to log in and play the alpha.</strong></Text>
        </Box>
      </Flex>
    </Layout>
    <Image src={XDragon} alt='XDragon' fill style={{zIndex: -999, opacity: '75%'}} />
    </>
  );
}
