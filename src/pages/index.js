import Layout from '@/components/Layout/Layout';
import { Box, Button, Container, Flex, Text } from '@mantine/core';
import AngelKey from '../../public/Angel-P_S-Star_3.mp4'
import NBCLogo from '../../public/NBCLogo.png'
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <Flex
        direction='column'
        align='center'
        justify='center'
      >
        {/* <Box 
          sx={(theme) => ({
            background: 'rgba(0, 0, 0, 0.85)',
            borderRadius: theme.radius.md,
            borderBottom: '3px solid #42ca9f',
            borderRight: '1px solid #42ca9f',
            borderTop: '1px solid #42ca9f',
            borderLeft: '3px solid #42ca9f',
            padding: theme.spacing.md,
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 45,
            width: '35%',
            [theme.fn.smallerThan('sm')]:
            {
                fontSize: theme.fontSizes.xs,
            }
          })}
        >
          <Text>Staking LIVE!</Text>
        </Box>
        <Box 
          sx={(theme) => ({
            background: 'rgba(0, 0, 0, 0.85)',
            borderRadius: theme.radius.md,
            borderBottom: '3px solid #42ca9f',
            borderRight: '1px solid #42ca9f',
            borderTop: '1px solid #42ca9f',
            borderLeft: '3px solid #42ca9f',
            padding: theme.spacing.md,
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 45,
            width: '35%',
            [theme.fn.smallerThan('sm')]:
            {
                fontSize: theme.fontSizes.xs,
            }
          })}
        >
        </Box> */}
      </Flex>
    </Layout>
  )
}
