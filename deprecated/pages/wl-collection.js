import MainNavbar from '@/components/Navbar/Navbar';
import WLCollectionBody from '@/components/WLCollection/Body';
import WLCollectionHeading from '@/components/WLCollection/Heading';
import WLCollectionInfoBox from '@/components/WLCollection/InfoBox';
import WLCollectionSteps from '@/components/WLCollection/Steps';
import WLCollectionWP from '@/components/WLCollection/WholePage';
import WLCollectionMB from '@/components/WLCollection/WholePage';
import { Box, Center, Container, createStyles, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconArrowBarDown, IconArrowBarRight, IconWallet } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    warningIcon: {
        marginRight: '15px',
    }
}));

const WLCollection = () => {
    const { classes } = useStyles();
    return (
        <>
            <MainNavbar />
            <WLCollectionWP>
                <WLCollectionHeading />
                <WLCollectionBody>
                    <WLCollectionInfoBox />
                    <WLCollectionSteps />
                </WLCollectionBody>
            </WLCollectionWP>
        </>
    )
}

export default WLCollection;