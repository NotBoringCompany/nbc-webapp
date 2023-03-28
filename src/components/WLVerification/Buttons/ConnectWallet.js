import { Button } from '@mantine/core';
import { useState } from 'react';
const { useMoralis } = require('react-moralis')

const WLVerificationConnectWalletButton = () => {
    const { enableWeb3, isAuthenticated, logout, Moralis } = useMoralis();
    const [ authError, setAuthError ] = useState(false);
    const [ isAuthenticating, setIsAuthenticating ] = useState(false);

    if (!isAuthenticated) {
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
            >
                Connect
            </Button>
        )
    }

    return (
        <Button 
            sx={(theme) => ({
                backgroundColor: '#42ca9f',
                marginRight: 25,

                ':hover': {
                    cursor: 'not-allowed'
                },

                [theme.fn.smallerThan('sm')]: {
                    fontSize: 10,
                }
            })}
            disabled
        >
            Wallet already connected
        </Button>
    );
}

export default WLVerificationConnectWalletButton