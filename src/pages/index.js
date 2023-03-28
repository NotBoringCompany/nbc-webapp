import MainNavbar from '@/components/Navbar/Navbar';
import WLVerificationInfoBox from '@/components/WLVerification/InfoBox';
import WLVerificationCheckStatus from '@/components/WLVerification/InfoBoxComponents/CheckStatus';
import WLVerificationVerifyWallet from '@/components/WLVerification/InfoBoxComponents/VerifyWallet';
import WLVerificationMainBody from '@/components/WLVerification/MainBody';
import WLVerificationSteps from '@/components/WLVerification/Steps';
import WLVerificationWholePage from '@/components/WLVerification/WholePage';
import { Box, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconWallet } from '@tabler/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import x0005 from '../../public/x0005.jpeg';

export default function Home() {
    const [whitelistType, setWhitelistType] = useState('');
    const { isAuthenticated, user } = useMoralis();
    const [wallet, setWallet] = useState('');

    useEffect(() => {
        setWallet(user && user.attributes.ethAddress)
    }, [user])

    return (
        <>
            <MainNavbar />
            <WLVerificationWholePage whitelistType={whitelistType} setWhitelistType={setWhitelistType} wallet={wallet} setWallet={setWallet}>
                <WLVerificationMainBody>
                    <WLVerificationInfoBox />
                    <WLVerificationSteps wallet={wallet} isAuthenticated={isAuthenticated} isWhitelisted={whitelistType === 'guaranteed' || whitelistType === 'overallocated'} />
                </WLVerificationMainBody>
            </WLVerificationWholePage>
        </>
    )
}