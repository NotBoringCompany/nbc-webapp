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
import x0005 from '../../public/x0005.jpeg';

export default function Home() {
    return (
        <>
            <MainNavbar />
            <WLVerificationWholePage>
                <WLVerificationMainBody>
                    <WLVerificationInfoBox />
                    <WLVerificationSteps />
                </WLVerificationMainBody>
            </WLVerificationWholePage>
        </>
    )
}