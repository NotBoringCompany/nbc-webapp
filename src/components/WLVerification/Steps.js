import { Flex } from '@mantine/core'
import { useState } from 'react'
import WLVerificationConnectWalletStep from './StepsComponents/ConnectWallet'
import WLVerificationVerifyWalletStep from './StepsComponents/VerifyWallet'

const WLVerificationSteps = ({wallet, isAuthenticated, isWhitelisted}) => {
    return (
        <Flex
            direction='column'
            sx={(theme) => ({
                width: '75%',
                marginTop: 30,
                [theme.fn.smallerThan('sm')]: {
                    minWidth: '100%',
                }
            })}
        >
            <Flex
                direction='column'
                align='center'
                justify='center'
            >
                <WLVerificationConnectWalletStep isAuthenticated={isAuthenticated} />
                <WLVerificationVerifyWalletStep wallet={wallet} isWhitelisted={isWhitelisted} isAuthenticated={isAuthenticated} />
            </Flex>
        </Flex>
    )
}

export default WLVerificationSteps