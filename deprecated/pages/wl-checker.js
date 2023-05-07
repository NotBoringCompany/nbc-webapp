import MainNavbar from '@/components/Navbar/Navbar';
import { createStyles, Flex, Button, Box, TextInput } from '@mantine/core';
import Image from 'next/image';
import XandLamox from '../../public/XandLamox.png';
import TestKey from '../../public/TestKey.png';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    keyImage: {
        borderRadius: '50%',
        marginTop: '-40px',
        marginBottom: '10px',
        zIndex: 5,
        border: '3px solid #42ca9f'
    },
}));

const WLChecker = () => {
    const { classes } = useStyles();
    const [ walletValue, setWalletValue ] = useState('');
    return (
        <>
            <MainNavbar />
            <Flex
                gap='md'
                justify='center'
                align='center'
                direction='column'
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
                    <Image src={TestKey} alt='TestKey' width={90} height={90} className={classes.keyImage} />
                    <h1>Genesis Pass Whitelist Checker</h1>
                    <p>
                        Enter your <b>EVM</b> wallet address below to check <br />
                        if you are whitelisted for our Genesis Pass mint.
                    </p>
                    <TextInput
                        sx={(theme) => ({
                            marginTop: 25,
                        })}
                        styles={(theme) => ({
                            input: {
                                ':focus-within': {
                                    borderColor: '#42ca9f'
                                }
                            }
                        })}
                        radius='sm'
                        placeholder='0x123...'
                        value={walletValue}
                        onChange={(e) => setWalletValue(e.target.value)}
                    />
                    <Button 
                        sx={(theme) => ({
                            background: '#42ca9f',
                            marginTop: 25,
                            marginBottom: 15,
                            ':hover': {
                                transform: 'scale(1.01) translate(1px, -3px)',
                                transitionDuration: '200ms',
                                backgroundColor: '#42ca9f',
                            }
                        })}
                        onClick={() => alert(`Checking wallet ${walletValue}`)}
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
                        zIndex: -9999,
                    }}
                    quality={100}
                />
            </Flex>
        </>
        
    )
}

export default WLChecker;