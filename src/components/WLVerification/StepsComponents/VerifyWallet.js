import { Box, Button, Flex, Text } from '@mantine/core'
import { IconCheck, IconFileCheck } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import WLVerificationVerifyWalletButton from '../Buttons/VerifyWallet'
import WLVerificationStepBox from './StepBox'

const WLVerificationVerifyWalletStep = ({wallet, isWhitelisted, isAuthenticated}) => {
    const [hasVerified, setHasVerified] = useState(false);

    useEffect(() => {
        const checkVerified = async () => {
            try {
                const res = await fetch(
                    `https://nbc-webapp-api.up.railway.app/kosWallets/checkWalletValidated/${wallet}`,
                    {
                        method: 'GET'
                    }
                )

                const { data } = await res.json()
                setHasVerified(data.validated)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        checkVerified()
    }, [wallet])
    const stepBoxStyle = () => {
        if (isAuthenticated) {
            if (isWhitelisted) {
                if (hasVerified) {
                    return {border: '2px solid #42ca9f'}
                } else {
                    return {border: '2px solid white'}
                }
            } else {
                return {border: '2px solid #ca4242'}
            }
        } else {
            return {border: '2px solid white'}
        }
    }

    const iconAndTextStyle = () => {
        if (isAuthenticated) {
            if (isWhitelisted) {
                if (hasVerified) {
                    return '#42ca9f'
                } else {
                    return 'white'
                }
            } else {
                return '#ca4242'
            }
        } else {
            return 'white'
        }
    }
    return (
        <WLVerificationStepBox
            style={ stepBoxStyle() }
        >
            <Flex
                direction='row'
                align='center'
            >
                <IconFileCheck size={35} color={iconAndTextStyle()} />
                <Text
                    color={iconAndTextStyle()}
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
                    Verify your wallet.
                </Text>
                {hasVerified && (
                    <IconCheck style={{marginLeft: 5}} color='#42ca9f' />
                )}
            </Flex>
            <WLVerificationVerifyWalletButton wallet={wallet} isWhitelisted={isWhitelisted} hasVerified={hasVerified} setHasVerified={setHasVerified} />
        </WLVerificationStepBox>
    )
}

export default WLVerificationVerifyWalletStep