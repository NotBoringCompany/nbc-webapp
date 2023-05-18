import MainNavbar from '@/components/Navbar/Navbar';
import WLVerificationInfoBox from '@/components/WLVerification/InfoBox';
import WLVerificationMainBody from '@/components/WLVerification/MainBody';
import WLVerificationSteps from '@/components/WLVerification/Steps';
import WLVerificationWholePage from '@/components/WLVerification/WholePage';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const WLVerification = () => {
    const [whitelistType, setWhitelistType] = useState('');
    const { isAuthenticated, user } = useMoralis();
    const [wallet, setWallet] = useState('');

    useEffect(() => {
        setWallet(user?.attributes?.ethAddress)
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

export default WLVerification;