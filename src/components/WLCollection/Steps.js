import { Box, Flex } from '@mantine/core';
import { IconWallet } from '@tabler/icons';
import ConnectWalletStep from './StepsComponents/ConnectWallet';
import FollowTwitterStep from './StepsComponents/CheckTwitter';
import CheckTwitterStep from './StepsComponents/CheckTwitter';

const WLCollectionSteps = () => {
    return (
        <Flex
            direction='column'
            align='center'
            justify='center'
            sx={(theme) => ({
                width: '75%',
                [theme.fn.smallerThan('sm')]: {
                    minWidth: '100%',
                }
            })}
        >
            <ConnectWalletStep />
            <CheckTwitterStep />
        </Flex>
    );
}

export default WLCollectionSteps;