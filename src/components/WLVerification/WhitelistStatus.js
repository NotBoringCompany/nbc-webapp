import { Box, Button, Flex, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

const WLVerificationWhitelistStatus = ({ whitelistType, setWhitelistType, wallet, setWallet }) => {
    useEffect(() => {
        const checkWlType = async () => {
            try {
                const res = await fetch(
                    `https://nbc-webapp-api.up.railway.app/kosWallets/checkWalletValidity/${wallet}`,
                    {
                        method: 'GET'
                    }
                )
        
                const { data } = await res.json()
                setWhitelistType(data.whitelistType)
            } catch (err) {
                console.log(err);
            }
        }

        checkWlType()
    }, [wallet, setWhitelistType])

    
    return (
        <Box
            style={!wallet ? { border: '2px solid white' } : whitelistType === 'none' ? { border: '2px solid #ca4242' } : { border: '2px solid #42ca9f' }}
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '40%',
            })}
        >
            <Flex
                direction='row'
                align='center'
                justify='center'
            >
                <Text
                    color={!wallet ? 'white' : whitelistType === 'none' ? '#ca4242' : '#42ca9f'}
                    sx={(theme) => ({
                        margin: '10px 25px 10px 25px',
                        fontSize: 22
                    })}
                >
                    Your Whitelist Status: <Text span style={{fontWeight: 500}}>{!wallet ? 'Wallet not connected' : whitelistType === 'none' ? 'Not Whitelisted' : whitelistType}</Text>
                </Text>
            </Flex>
        </Box>
    )
}

export default WLVerificationWhitelistStatus