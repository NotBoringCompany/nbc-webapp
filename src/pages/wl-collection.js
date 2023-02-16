import MainNavbar from '@/components/Navbar/Navbar';
import { Box, Center, Container, createStyles, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    warningIcon: {
        color: '#42ca9f',
        size: 30,
        marginRight: '15px',
    }
}))

const WLCollection = () => {
    const { classes } = useStyles();
    return (
        <>
            <MainNavbar />
            <Flex
                gap='md'
                justify='center'
                align='center'
                direction='column'
                sx={(theme) => ({
                    'h1': {
                        fontSize: '70px',
                    },
                    [theme.fn.smallerThan('sm')]: {
                        'h1': {
                            fontSize: '40px',
                        }
                    }
                })}
            >
                <h1>Genesis Pass Access</h1>
                <Container
                    sx={(theme) => ({
                        marginTop: -50,
                        borderTop: '3px solid #42ca9f',
                        maxWidth: '50%',

                        [theme.fn.smallerThan('sm')]: {
                            marginTop: -20,
                            fontSize: '16px',
                            maxWidth: '90%',
                        }
                    })}
                >
                    <Text sx={(theme) => ({
                        marginTop: 20,
                        textAlign: 'center',
                    })}>
                        Take part in our upcoming and highly anticipated <Text span c='#42ca9f'><b>Genesis Pass Free Mint.</b></Text> Verify or register now for a chance to win a whitelist spot.
                    </Text>
                    <Center>
                        <Box
                            sx={(theme) => ({
                                marginTop: 20,
                                padding: '10px 20px',
                                borderRadius: theme.radius.md,
                                width: '75%',
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
                                })}><b>For Hunters with an existing whitelist spot</b></Text>
                            </Flex>
                            <Text sx={(theme) => ({
                                marginTop: '10px',
                                fontSize: '16px',
                                [theme.fn.smallerThan('sm')]: {
                                    fontSize: '12px'
                                }
                            })}>
                                DTC: Hunters who&apos;ve won a whitelist spot from DTC collabs are only required to <Text span c='#42ca9f'>verify their wallets.</Text>
                            </Text>
                            <Divider color='#42ca9f' size='xs' sx={{marginTop: 10}} variant='dashed' />
                            <Text sx={(theme) => ({
                                marginTop: '10px',
                                fontSize: '16px',
                                [theme.fn.smallerThan('sm')]: {
                                    fontSize: '12px'
                                }
                            })}>
                                Overallocated (OA): Hunters who&apos;ve won a whitelist spot from OA collabs and <Text span c='#42ca9f'>claimed it within the given time period</Text> are only required to <Text span c='#42ca9f'>verify their wallets.</Text>
                            </Text>
                        </Box>
                    </Center>
                </Container>
            </Flex>
        </>
    )
}

export default WLCollection;