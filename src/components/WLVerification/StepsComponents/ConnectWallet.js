import { Box, Flex, Text } from '@mantine/core'
import { IconCheck, IconWallet } from '@tabler/icons'
import { useMoralis } from 'react-moralis'
import WLVerificationConnectWalletButton from '../Buttons/ConnectWallet'

const WLVerificationConnectWalletStep = () => {
    const { isAuthenticated } = useMoralis();
    return (
        <Box
            style={isAuthenticated ? {border: '2px solid #42ca9f'} : {border: '2px solid white'}}
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '100%',
                textAlign: 'center',
                marginBottom: 15,
                marginTop: 0,
            })}
        >
            <Flex
                direction='row'
                align='center'
                justify='space-between'
                sx={(theme) => ({
                    marginLeft: 15,
                })}
            >
                <Flex
                    direction='row'
                    align='center'
                >
                    <IconWallet size={35} color={isAuthenticated ? '#42ca9f' : 'white'} />
                    <Text
                        color={isAuthenticated ? '#42ca9f' : 'white'}
                        sx={(theme) => ({
                            margin: '20px 0px 20px 25px',
                            fontSize: 20,
                            fontWeight: 500,

                            [theme.fn.smallerThan('sm')]: {
                                fontSize: 14,
                                margin: '20px 2px 20px 25px',
                            }
                        })}
                    >
                        Connect your wallet
                    </Text>
                    {isAuthenticated && (
                        <IconCheck style={{marginLeft: 5}} color='#42ca9f' />
                    )}
                </Flex>
                <WLVerificationConnectWalletButton />
            </Flex>
        </Box>
    )
}

export default WLVerificationConnectWalletStep