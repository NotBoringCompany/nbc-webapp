import { Box, Button, Flex, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

const WLVerificationWhitelistStatus = () => {
    const { isAuthenticated, user } = useMoralis();
    const [wallet, setWallet] = useState('');
    const [whitelistType, setWhitelistType] = useState('');

    useEffect(() => {
        setWallet(user && user.attributes.ethAddress)

        const checkWlType = async () => {
            try {
                const res = await fetch(
                    `https://nbc-webapp-api.up.railway.app/kosWallets/checkWalletValidity/${wallet}`,
                    {
                        method: 'GET'
                    }
                )
        
                const data = await res.json()
                setWhitelistType(data.whitelistType)
            } catch (err) {
                console.log(err)
            }
        }

        checkWlType()
    }, [user, wallet])

    
    return (
        <Box
            style={whitelistType === 'none' ? { border: '2px solid #ca4242' } : { border: '2px solid #42ca9f' }}
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '33%',
            })}
        >
            <Flex
                direction='row'
                align='center'
                justify='center'
            >
                <Text
                    color={whitelistType === 'none' ? '#ca4242' : '#42ca9f'}
                    sx={(theme) => ({
                        margin: '10px 25px 10px 25px',
                        fontSize: 22
                    })}
                >
                    Your Whitelist Status: <Text span style={{fontWeight: 500}}>{whitelistType === 'none' ? 'Not Whitelisted' : whitelistType}</Text>
                </Text>
            </Flex>
        </Box>
    )
}

export default WLVerificationWhitelistStatus