import MainNavbar from '@/components/Navbar/Navbar';
import { createStyles, Center, Container, Flex, Button, BackgroundImage, Box, TextInput } from '@mantine/core';
import Image from 'next/image';
import XandLamox from '../../public/XandLamox.png'
import { useState } from 'react';

const WLChecker = () => {
    const [walletValue, setWalletValue] = useState('');
    return (
        <>
            <MainNavbar />
            <Flex
                gap='md'
                justify='center'
                align='center'
            >
                <Box sx={(theme) => ({
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
                })}>
                    <h1>Genesis Pass Whitelist Checker</h1>
                    <p>
                        Enter your <b>EVM</b> wallet address below to check <br />
                        if you are whitelisted for our Genesis Pass mint.
                    </p>
                    <TextInput
                        sx={(theme) => ({
                            marginTop: 25,
                        })}
                        placeholder='0x123...'
                        value={walletValue}
                        onChange={(e) => setWalletValue(e.target.value)}
                    />
                    <Button 
                        sx={(theme) => ({
                            background: '#42ca9f',
                            marginTop: 25,
                            marginBottom: 15,
                        })}
                    >
                        Check wallet
                    </Button>

                </Box>
                <Image
                    src={XandLamox}
                    alt='XandLamox'
                    fill
                    style={{
                        objectFit: 'cover',
                        zIndex: -9999
                    }}
                />
            </Flex>
        </>
        
    )
}

export default WLChecker;