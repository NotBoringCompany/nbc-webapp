import { useEffect, useState } from 'react';
import { createStyles, Modal, Button, Group, Center } from '@mantine/core';
import MetamaskLogo from '../../../public/metamask.png';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import handleAuth from '@/utils/moralisAuth';

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
    const [ authError, setAuthError ] = useState(false);
    const [ isAuthenticating, setIsAuthenticating ] = useState(false);
    
    useEffect(() => {
        if (isAuthenticated) {
            setShowSelectWallet(false);
        }
    }, [isAuthenticated, setShowSelectWallet]);
    

    return (
        <>
            <Modal 
                opened={showSelectWallet}
                centered
                onClose={() => setShowSelectWallet(false)}
                title='Please select a wallet.'
            >
                <Center>
                    <Button className={classes.walletButton} onClick={() => handleAuth(
                        setAuthError,
                        setIsAuthenticating,
                        enableWeb3,
                        Moralis,
                        authenticate,
                        'metamask'
                    )}>
                        <Image src={MetamaskLogo} alt='metamask logo' width={48} height={48} className={classes.image} />
                        <h2>Metamask</h2>
                    </Button>
                </Center>
            </Modal>
        </>
    );
}

export default SelectWallet;