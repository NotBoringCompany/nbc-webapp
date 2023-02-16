import MainNavbar from '@/components/Navbar/Navbar';
import WLCollectionMB from '@/components/WLCollection/MainBody';
import { Box, Center, Container, createStyles, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconArrowBarDown, IconArrowBarRight, IconWallet } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    warningIcon: {
        marginRight: '15px',
    }
}))

const WLCollection = () => {
    const { classes } = useStyles();
    return (
        <>
            <MainNavbar />
            <WLCollectionMB>
            <h1>Genesis Pass Access</h1>
                <Text sx={(theme) => ({
                        textAlign: 'center',
                        marginTop: -50,
                        width: '100%',
                        [theme.fn.smallerThan('sm')]: {
                            width: '85%',
                            marginTop: -30,
                        }
                    })}>
                        Take part in our upcoming <Text span c='#42ca9f'><b>Genesis Pass Free Mint.</b></Text> Verify (or register by completing the steps for a chance) to win a whitelist spot.
                </Text>
                <Flex
                    justify='center'
                    align='center'
                    sx={(theme) => ({
                        maxWidth: '75%',
                        flexDirection: 'row',                        

                        [theme.fn.smallerThan('sm')]: {
                            marginTop: -20,
                            fontSize: '16px',
                            maxWidth: '90%',
                            flexDirection: 'column',
                        }
                    })}
                >
                    <Box
                        sx={(theme) => ({
                            margin: '20px 30px',
                            padding: '10px 20px',
                            borderRadius: theme.radius.md,
                            width: '50%',
                            textAlign: 'center',
                            borderBottom: '2px solid #42ca9f',
                            borderRight: '2px solid #42ca9f',
                            borderTop: '2px solid #42ca9f',
                            borderLeft: '2px solid #42ca9f',

                            [theme.fn.smallerThan('sm')]: {
                                width: '100%',
                            }
                        })}
                    >
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                        >
                            <IconAlertOctagon color='#42ca9f' size={30} className={classes.warningIcon}/>
                            <Text sx={(theme) => ({
                                color: '#42ca9f',
                                fontSize: '20px',
                                [theme.fn.smallerThan('sm')]: {
                                    fontSize: '14px'
                                }
                            })}>
                                <b>For Hunters with an existing whitelist spot</b>
                            </Text>
                        </Flex>
                        <Text sx={(theme) => ({
                            marginTop: '10px',
                            fontSize: '16px',
                            [theme.fn.smallerThan('sm')]: {
                                fontSize: '12px'
                            }
                        })}>
                            Hunters who have won a whitelist spot from DTC or overallocated collabs (for OA, you were required to claim your spot within the allocated time period) are only required to <Text span c='#42ca9f'>verify their wallet. </Text>
                            Following and retweeting are optional.
                            
                        </Text>
                        
                        <Divider color='#42ca9f' size='xs' sx={{marginTop: 15}} variant='dashed' />
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                            style={{marginTop: 15}}
                        >
                            <IconAlertOctagon color='#42ca9f' size={30} className={classes.warningIcon}/>
                            <Text sx={(theme) => ({
                                color: '#42ca9f',
                                fontSize: '20px',
                                [theme.fn.smallerThan('sm')]: {
                                    fontSize: '14px'
                                }
                            })}><b>For new Hunters</b>
                            </Text>
                        </Flex>
                        <Text sx={(theme) => ({
                            marginTop: '10px',
                            fontSize: '16px',
                            [theme.fn.smallerThan('sm')]: {
                                fontSize: '12px'
                            }
                        })}>
                            New Hunters are required to complete <Text span c='#42ca9f'>all</Text> steps. 
                        </Text>
                    </Box>
                    <Flex
                        direction='column'
                        align='center'
                        justify='center'
                        sx={(theme) => ({
                            width: '75%',
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                borderRadius: theme.radius.md,
                                width: '100%',
                                textAlign: 'center',
                                borderBottom: '2px solid #42ca9f',
                                borderRight: '2px solid #42ca9f',
                                borderTop: '2px solid #42ca9f',
                                borderLeft: '2px solid #42ca9f',
                                marginBottom: 15,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                                sx={(theme) => ({
                                    marginLeft: 15,
                                })}
                            >
                                <IconWallet size={35} />
                                <h3 style={{marginLeft: 30}}>Connect your wallet</h3>
                            </Flex>
                        </Box>
                        <Box
                            sx={(theme) => ({
                                borderRadius: theme.radius.md,
                                width: '100%',
                                textAlign: 'center',
                                borderBottom: '2px solid #42ca9f',
                                borderRight: '2px solid #42ca9f',
                                borderTop: '2px solid #42ca9f',
                                borderLeft: '2px solid #42ca9f',
                            })}
                        >
                            <IconWallet size={20} />
                            <h4>Connect your wallet.</h4>
                        </Box>
                    </Flex>
                </Flex>
            </WLCollectionMB>
        </>
    )
}

export default WLCollection;