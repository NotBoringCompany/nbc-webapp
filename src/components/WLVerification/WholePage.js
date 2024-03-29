import { useState } from 'react'
import WLVerificationWhitelistStatus from './WhitelistStatus'

const { Flex, Text } = require('@mantine/core')

const WLVerificationWholePage = ({whitelistType, setWhitelistType, wallet, setWallet, children}) => {
    return (
        <Flex
            gap='md'
            justify='center'
            align='center'
            direction='column'
            sx={(theme) => ({
                minWidth: '100%',
                minHeight: '100%',
                marginTop: 30,
            })}
        >
            <Text 
                sx={(theme) => ({
                    fontSize: 64,
                    fontWeight: 600,
                })}
            >
                Genesis Pass <Text span c='#42ca9f'>Wallet Verification</Text>
            </Text>
            <WLVerificationWhitelistStatus whitelistType={whitelistType} setWhitelistType={setWhitelistType} wallet={wallet} setWallet={setWallet}/>
            {children}
        </Flex>
    )
}

export default WLVerificationWholePage