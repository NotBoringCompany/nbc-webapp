import MainNavbar from '@/components/Navbar/Navbar';
import WLVerificationInfoBox from '@/components/WLVerification/InfoBox';
import WLVerificationCheckStatus from '@/components/WLVerification/InfoBoxComponents/CheckStatus';
import WLVerificationVerifyWallet from '@/components/WLVerification/InfoBoxComponents/VerifyWallet';
import WLVerificationMainBody from '@/components/WLVerification/MainBody';
import WLVerificationSteps from '@/components/WLVerification/Steps';
import WLVerificationWholePage from '@/components/WLVerification/WholePage';
import { Box, createStyles, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconWallet } from '@tabler/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import x0005 from '../../public/x0005.jpeg';
import XandLamox from '../../public/XandLamox.png';
import RHLogo from '../../public/rhLogo.png';
import CountdownTimer from '@/components/Countdown';
import { calculateRemainingTime } from '@/utils/countdown';

export default function Home() {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [remainingTime, setRemainingTime] = useState({});
    const [timerEnded, setTimerEnded] = useState(false);

    useEffect(() => {
        if (remainingTime !== {}) {
            setPageLoaded(true);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateRemainingTime(parseInt(process.env.NEXT_PUBLIC_GUARANTEED_MINT_TIMESTAMP) * 1000));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (remainingTime.total <= 0 && !timerEnded) {
            setTimerEnded(true);
            window.location.reload();
        }
    }, [remainingTime, timerEnded])
    
    return (
        <>
            <MainNavbar />
            <Flex
                gap='md'
                justify='center'
                align='center'
                direction='row'
                sx={(theme) => ({
                    minHeight: 'calc(100vh - 80px)',
                    minWidth: '100vw',
                })}
            >
                <Image 
                    src={RHLogo}
                    alt='rhLogo'
                    width={550}
                    height={550}
                />
                {remainingTime.total > 0 && (
                    <Box
                        sx={(theme) => ({
                            padding: theme.spacing.md,
                            borderRadius: theme.radius.lg,
                            minWidth: '35vw',
                            maxWidth: '35vw',
                            marginLeft: '5vw',
                            background: 'rgba(0, 0, 0, 0.8)',
                        })}
                    >
                        <Flex
                            direction='column'
                            justify='center'
                            align='center'
                        >
                            <Text
                                sx={(theme) => ({
                                    fontSize: 48,
                                    fontWeight: 'bold',
                                    color: 'white',
                                })}
                            >
                                KEY OF SALVATION
                            </Text>
                            <Box
                                sx={(theme) => ({
                                    border: '3px solid #ca4242',
                                    backgroundColor: '#ca4242',
                                    borderRadius: theme.radius.lg,
                                    minWidth: '15vw',
                                    maxWidth: '15vw',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '3vh',
                                    color: 'white',
                                    padding: '0.3vh',
                                })}
                            >
                                <Text>Mint Status: Not Started</Text>
                            </Box>
                            <Text
                                sx={(theme) => ({
                                    fontSize: 30,
                                    marginTop: '5vh',
                                    color: 'white',
                                })}
                            >
                                MINT STARTS IN
                            </Text>
                            <Text
                                sx={(theme) => ({
                                    fontSize: 48,
                                    fontWeight: 400,
                                    color: '#42ca9f',
                                })}
                            >
                                {String(remainingTime.days).padStart(2, '0')}:{String(remainingTime.hours).padStart(2, '0')}:{String(remainingTime.minutes).padStart(2, '0')}:{String(remainingTime.seconds).padStart(2, '0')}
                            </Text>
                        </Flex>
                    </Box>
                )}
                {remainingTime.total <= 0 && (
                    <Box
                        sx={(theme) => ({
                            padding: theme.spacing.md,
                            borderRadius: theme.radius.lg,
                            minWidth: '35vw',
                            maxWidth: '35vw',
                            marginLeft: '5vw',
                            background: 'rgba(0, 0, 0, 0.8)',
                        })}
                    >
                        <Flex
                            direction='column'
                            justify='center'
                            align='center'
                        >
                            <Text
                                sx={(theme) => ({
                                    fontSize: 48,
                                    fontWeight: 'bold',
                                    color: 'white',
                                })}
                            >
                                KEY OF SALVATION
                            </Text>
                            {/* <Flex
                                direction='row'
                                justify='center'
                                align='center'
                            >
                                <Box
                                    sx={(theme) => ({
                                        border: '3px solid #42ca9f',
                                        backgroundColor: '#42ca9f',
                                        borderRadius: theme.radius.lg,
                                        minWidth: '15vw',
                                        maxWidth: '15vw',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '3vh',
                                        marginRight: '2vw',
                                        color: 'white',
                                    })}
                                >
                                    <Text>Mint Status: Guaranteed</Text>
                                </Box>
                                <Box
                                    sx={(theme) => ({
                                        border: '3px solid #42ca9f',
                                        backgroundColor: '#42ca9f',
                                        borderRadius: theme.radius.lg,
                                        minWidth: '15vw',
                                        maxWidth: '15vw',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '3vh',
                                        color: 'white',
                                    })}
                                >
                                    <Text>Mint Status: Guaranteed</Text>
                                </Box>
                            </Flex> */}
                            <Box
                                sx={(theme) => ({
                                    border: '3px solid #42ca9f',
                                    backgroundColor: '#42ca9f',
                                    borderRadius: theme.radius.lg,
                                    minWidth: '15vw',
                                    maxWidth: '15vw',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '3vh',
                                    marginRight: '2vw',
                                    color: 'white',
                                })}
                            >
                                <Text sx={(theme) => ({
                                    fontSize: 18,
                                })}>
                                    Mint Status: Guaranteed
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                )}
                <Image 
                    src={x0005}
                    alt='XandLamox'
                    fill
                    style={{
                        objectFit: 'cover',
                        zIndex: -9999,
                        opacity: 0.85,
                    }}
                    quality={100}
                />
            </Flex>
        </>
    )
}