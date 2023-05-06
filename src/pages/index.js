import Layout from '@/components/Layout/Layout';
import { Box, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconCheck, IconX } from '@tabler/icons';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isAuthenticated, user } = useMoralis();
  const emailConnected = user && user.get('emailAddress') !== null;
  // checks if the user has AT LEAST 1 key of salvation
  const [hasKey, setHasKey] = useState(false);

  const ownsKey = async () => {
    const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/owner-ids/${user && user.attributes.ethAddress}`);
    const res = await rawRes.json();

    setHasKey(res.data?.ownerIds?.length > 0);
  }

  useEffect(() => {
    ownsKey();
  }, [user])

  return (
    <Layout>
      <Flex align='center' justify='center' direction='column' h={'calc(100vh - 150px)'}>
        <Text size={94} weight={700}>
          REALM HUNTER: ALPHA RELEASE
        </Text>
        <Text size={36} weight={500}>
          Alpha V1.0 is now out for Key Of Salvation holders!
        </Text>
        <Box
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            minWidth: '50%',
            border: isAuthenticated && emailConnected ? '2px solid #42ca9f' : '2px solid #ca4242',
            padding: '20px',
            textAlign: 'center',
            marginTop: 50,
          })}
        >
          <Flex
            direction='row'
            align='center'
            justify='center'
          >
            <IconAlertOctagon size={30} style={{marginRight: 15}} />
            <Text size={22} weight={600}>FOLLOW THESE STEPS TO GAIN ACCESS TO THE ALPHA</Text>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='center'
            mt={30}
          >
            {isAuthenticated ? <IconCheck size={30} style={{marginRight: 15}} color='#42ca9f' /> : <IconX size={30} style={{marginRight: 15}} color='#ca4242' />}
            <Text size={18} color={isAuthenticated ? '#42ca9f' : '#ca4242'}>{isAuthenticated ? 'Wallet connected' : 'Connect your wallet'}</Text>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='center'
            mt={10}
          >
            {emailConnected ? <IconCheck size={30} style={{marginRight: 15}} color='#42ca9f' /> : <IconX size={30} style={{marginRight: 15}} color='#ca4242' />}
            <Text size={18} color={emailConnected ? '#42ca9f' : '#ca4242'}>{emailConnected ? 'Email connected' : 'Connect your email to your wallet'}</Text>
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='center'
            mt={10}
          >
            {hasKey ? <IconCheck size={30} style={{marginRight: 15}} color='#42ca9f' /> : <IconX size={30} style={{marginRight: 15}} color='#e9d562' />}
            <Text size={18} color={hasKey ? '#42ca9f' : '#e9d562'}>{emailConnected ? 'At least 1 Key Of Salvation owned' : 'Own at least 1 Key Of Salvation*'}</Text>
          </Flex>
          {isAuthenticated && emailConnected && (
            <Text size={18} color='#42ca9f' mt={30} weight={700}>ALPHA LINK: <a href="https://drive.google.com/uc?export=download&id=1w6bsqIvBPX1Y-YpeLJafxCVL57YIRo9g" download>Download File</a></Text>
          )}
          <Text size={15} mt={30}>*Note: You don{"'t"} need a Key to gain access to the download link, <strong><br />however you are required to own AT LEAST 1 Key to log in and play the alpha.</strong></Text>
        </Box>
      </Flex>
    </Layout>
  );
}
