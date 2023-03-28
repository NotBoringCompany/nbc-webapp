import { Button } from '@mantine/core'
import { IconArrowRightRhombus } from '@tabler/icons'
import { useEffect, useState } from 'react'

const WLVerificationVerifyWalletButton = ({wallet, isWhitelisted, hasVerified, setHasVerified}) => {
    const [verifying, setVerifying] = useState(false)
    const verifyWallet = async () => {
        try {
            setVerifying(true)
            const res = await fetch(
                `https://nbc-webapp-api.up.railway.app/kosWallets/validateWallet`,
                {
                    method: 'POST',
                    body: JSON.stringify({wallet: wallet}),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',         
                    }
                }
            )

            const { data } = await res.json()
            if (data && data.validated) {
                await setHasVerified(true)
            }
            setVerifying(false)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

    }, [])
    if (isWhitelisted) {
        if (hasVerified) {
            return (
                <Button
                    sx={(theme) => ({
                        backgroundColor: '#42ca9f',
                        marginRight: 25,
                        ':hover': {
                            cursor: 'not-allowed',
                            backgroundColor: '#42ca9f',
                        }
                    })}
                >
                    Wallet already verified
                </Button>
            )
        }
        return (
            <Button
                sx={(theme) => ({
                    backgroundColor: '#42ca9f',
                    marginRight: 25,
                    ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                    }
                })}
                rightIcon={<IconArrowRightRhombus />}
                onClick={() => verifyWallet()}
                loading={verifying}
            >
                {hasVerified ? 'Wallet already verified' : 'Verify'}
            </Button>
        )
    }

    return (
        <Button
            sx={(theme) => ({
                backgroundColor: wallet ? '#ca4242' : 'gray',
                marginRight: 25,

                ':hover': {
                    cursor: 'not-allowed',
                    backgroundColor: wallet ? '#ca4242' : 'gray',
                },

                [theme.fn.smallerThan('sm')]: {
                    fontSize: 10,
                }
            })}
        >
            {wallet ? 'Wallet not whitelisted' : 'Connect wallet first'}
        </Button>
    )
}

export default WLVerificationVerifyWalletButton