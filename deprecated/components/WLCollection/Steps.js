import { Flex } from '@mantine/core';
import ConnectWalletStep from './StepsComponents/ConnectWallet';
import CheckTwitterStep from './StepsComponents/CheckTwitter';
import RetweetStep from './StepsComponents/Retweet';
import SubmitStep from './StepsComponents/Submit';

const WLCollectionSteps = () => {
    return (
        <Flex
            direction='column'
            sx={(theme) => ({
                width: '75%',
                marginTop: 30,
                [theme.fn.smallerThan('sm')]: {
                    minWidth: '100%',
                }
            })}
        >
            <Flex
                direction='column'
                align='center'
                justify='center'
            >
                <ConnectWalletStep />
                <CheckTwitterStep />
                <RetweetStep />
            </Flex>
            <SubmitStep />
        </Flex>
    );
}

export default WLCollectionSteps;