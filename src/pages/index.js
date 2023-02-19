import MainNavbar from '@/components/Navbar/Navbar';
import { Box, Button, Container, Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import Image from 'next/image';
import BorderIndex from '../../public/border_index.png';
import NBCLogo from '../../public/NBCLogo.png';
import NBCLogoWhite from '../../public/NBCLogoWhite.png';

export default function Home() {
  return (
    <>
      <MainNavbar />
      <Flex
        gap='md'
        justify='center'
        align='center'
        direction='column'
        sx={(theme) => ({
          minWidth: '100%',
          minHeight: '100%',
          marginTop: 30,
        })}
      >
        <Flex
          justify='space-between'
          align='center'
          direction='row'
          sx={(theme) => ({
            minHeight: '50%',
            maxHeight: '50%',
          })}
        >
          <Flex
            justify='center'
            align='center'
            direction='column'
          >
            <Text sx={(theme) => ({
              fontSize: 70,
              fontWeight: 600,
              marginLeft: 50,
              marginRight: 'auto',
            })}>
              Genesis Pass <Text span c='#42ca9f'>Free Mint</Text>
            </Text>
            <Text sx={(theme) => ({
              fontSize: 26,
              fontWeight: 300,
              marginLeft: 50,
              marginRight: 'auto',
            })}>
              Participate in our upcoming and highly anticipated Free Mint.
            </Text>
            <Flex>
              <Button sx={(theme) => ({
                border: '2px solid #42ca9f',
                backgroundColor: 'transparent',
                marginTop: 50,
                marginRight: 30,
                height: '50px',
                fontSize: 22,
                ':hover': {
                  transform: 'scale(1.01) translate(1px, -3px)',
                  transitionDuration: '200ms',
                  backgroundColor: '#42ca9f',
              },
              })}>Take me there!</Button>
              <Button sx={(theme) => ({
                border: '2px solid #42ca9f',
                backgroundColor: 'transparent',
                marginTop: 50,
                height: '50px',
                fontSize: 22,
                ':hover': {
                  transform: 'scale(1.01) translate(1px, -3px)',
                  transitionDuration: '200ms',
                  backgroundColor: '#42ca9f',
              },
              })}>Am I whitelisted?</Button>
            </Flex>
          </Flex>
          <video
            loop
            autoPlay
            muted
            playsInline
            style={{width: '45%', marginLeft: 100}}
          >
            <source src={require('../../public/Chaos_Key_Trim.mp4')} type='video/mp4' />
          </video>
        </Flex>
      </Flex>
    </>
  )
}
