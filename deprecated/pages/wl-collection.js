import MainNavbar from '@/components/Navbar/Navbar';
import { Box, Center, Container, createStyles, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconArrowBarDown, IconArrowBarRight, IconWallet } from '@tabler/icons';
import WLCollectionBody from 'deprecated/components/WLCollection/Body';
import WLCollectionHeading from 'deprecated/components/WLCollection/Heading';
import WLCollectionInfoBox from 'deprecated/components/WLCollection/InfoBox';
import WLCollectionSteps from 'deprecated/components/WLCollection/Steps';
import WLCollectionWP from 'deprecated/components/WLCollection/WholePage';

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