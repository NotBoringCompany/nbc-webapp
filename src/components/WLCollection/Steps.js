import { Box, Flex } from '@mantine/core';
import { IconWallet } from '@tabler/icons';
import ConnectWalletStep from './StepsComponents/ConnectWallet';

const WLCollectionSteps = () => {
    return (
        <Flex
            direction='column'
            align='center'
            justify='center'
            sx={(theme) => ({
                width: '75%',
            })}
        >
            <ConnectWalletStep />
        </Flex>
    );
}

export default WLCollectionSteps;