import MainNavbar from '@/components/Navbar/Navbar';
import { Box, Button, Container, createStyles, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconBrandDiscord, IconBrandTwitter } from '@tabler/icons';
import Image from 'next/image';
import BorderIndex from '../../public/border_index.png';
import NBCLogo from '../../public/NBCLogo.png';
import NBCLogoWhite from '../../public/NBCLogoWhite.png';

const useStyles = createStyles((theme) => ({
  keyVideo: {
    width: '45%',
    zIndex: -1,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    }
  },

  socialIcons: {
    width: 50,
    height: 50,
    marginRight: 30,
    [theme.fn.smallerThan('sm')]: {
      width: 40,
      height: 40,
    }
  },


}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <>
      <MainNavbar />
      <Flex
        gap='md'
        justify='center'
        align='center'
        direction='row'
        sx={(theme) => ({
          minWidth: '100%',
          minHeight: '100%',
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column'
          }
        })}
      >
        <video
          loop
          autoPlay
          muted
          playsInline
          className={classes.keyVideo}
        >
          <source src={require('../../public/Chaos_Key_Trim.mp4')} type='video/mp4' />
        </video>
        <Flex
          justify='center'
          align='center'
          direction='row'
          sx={(theme) => ({
            minHeight: '50%',
            maxHeight: '50%',
            [theme.fn.smallerThan('sm')]: {
              justify: 'center',
            }
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
              [theme.fn.smallerThan('sm')]: {
                fontSize: 30,
              }
            })}>
              Genesis Pass <Text span c='#42ca9f'>Free Mint</Text>
            </Text>
            <Text sx={(theme) => ({
              fontSize: 26,
              fontWeight: 300,
              marginLeft: 50,
              [theme.fn.smallerThan('sm')]: {
                fontSize: 16,
                marginLeft: 0,
              }
            })}>
              Participate in our upcoming and highly anticipated Free Mint.
            </Text>
            <Flex
              sx={(theme) => ({
                marginBottom: 50,
              [theme.fn.smallerThan('sm')]: {
                marginTop: -30,
              }
              })}
            >
              <Button sx={(theme) => ({
                border: '2px solid #42ca9f',
                backgroundColor: 'transparent',
                marginTop: 50,
                marginRight: 30,
                height: '50px',
                fontSize: 18,
                ':hover': {
                  transform: 'scale(1.01) translate(1px, -3px)',
                  transitionDuration: '200ms',
                  backgroundColor: '#42ca9f',
                },
                [theme.fn.smallerThan('sm')]: {
                  fontSize: 12,
                  marginLeft: 50
                }
              })}
              >
                Take me there!
              </Button>
              <Button sx={(theme) => ({
                border: '2px solid #42ca9f',
                backgroundColor: 'transparent',
                marginTop: 50,
                marginRight: 30,
                height: '50px',
                fontSize: 18,
                ':hover': {
                  transform: 'scale(1.01) translate(1px, -3px)',
                  transitionDuration: '200ms',
                  backgroundColor: '#42ca9f',
                },
                [theme.fn.smallerThan('sm')]: {
                  fontSize: 12,
                }
              })}
              >
                Am I whitelisted?
              </Button>
            </Flex>
            <Flex
              justify='center'
              align='center'
              direction='row'
            >
              <a href='https://twitter.com/realmhunterio' target='_blank' rel='noreferrer' style={{color: '#ffffff'}}>
                <IconBrandTwitter className={classes.socialIcons} />
              </a>
              <a href='https://discord.gg/realmhunter' target='_blank' rel='noreferrer' style={{color: '#ffffff'}}>
                <IconBrandDiscord className={classes.socialIcons} />
              </a>
            </Flex>
          </Flex>
          {/* <video
            loop
            autoPlay
            muted
            playsInline
            style={{width: '45%', marginLeft: 100}}
          >
            <source src={require('../../public/Chaos_Key_Trim.mp4')} type='video/mp4' />
          </video> */}
        </Flex>
      </Flex>
    </>
  )
}
