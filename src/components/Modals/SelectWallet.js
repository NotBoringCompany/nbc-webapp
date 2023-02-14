import { useEffect, useState } from 'react';
import { createStyles, Modal, Button, Group, Center } from '@mantine/core';
import MetamaskLogo from '../../../public/metamask.png';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';

const useStyles = createStyles((theme) => ({
    walletButton: {
        marginTop: 10,
        backgroundColor: '#42ca9f',
        width: '100%',
        minHeight: '60px',

        '&:hover': {
            transform: 'scale(1.01) translate(1px, -3px)',
            transitionDuration: '200ms',
            backgroundColor: '#42ca9f',
        },

        '&:active': {
            transform: 'translateY(2px)',
        }
    },

    image: {
        marginRight: 15,
    }
}));

const SelectWallet = ({showSelectWallet, setShowSelectWallet}) => {
    const { classes } = useStyles();

    const { enableWeb3, isAuthenticated, authenticate, logout, Moralis } = useMoralis();
    const [authError, setAuthError] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    
    useEffect(() => {
        if (isAuthenticated) {
            setShowSelectWallet(false);
        }
    }, [isAuthenticated, setShowSelectWallet]);
    
    const handleAuth = async (provider) => {
        try {
            setAuthError(null);
            setIsAuthenticating(true);

            // enable web3 to get user address and chain
            await enableWeb3({ throwOnError: true, provider });
            const { account, chainId } = Moralis;

            if (!account) {
                throw new Error('Connecting to chain failed as no connected account was found.');
            }
        
              if (!chainId) {
                throw new Error('Connecting to chain failed as no connected chain was found.');
            }

            // get message to sign from auth api
            const { message } = await Moralis.Cloud.run('requestMessage', {
                address: account,
                chain: parseInt(chainId, 16),
                network: 'evm',
            });

            // authenticate and login via parse
            await authenticate({
                signingMessage: message,
                throwOnError: true,
            });
        } catch (err) {
            setAuthError(err);
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
            <Modal 
                opened={showSelectWallet}
                centered
                onClose={() => setShowSelectWallet(false)}
                title='Please select a wallet.'
            >
                <Center>
                    <Button className={classes.walletButton} onClick={() => handleAuth('metamask')}>
                        <Image src={MetamaskLogo} alt='metamask logo' width={48} height={48} className={classes.image} />
                        <h2>Metamask</h2>
                    </Button>
                </Center>
            </Modal>
        </>
    );
}

export default SelectWallet;