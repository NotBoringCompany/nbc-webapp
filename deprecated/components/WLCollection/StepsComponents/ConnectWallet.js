import ConnectWalletStepButton from 'deprecated/components/WLCollection/Buttons/ConnectWalletStep';
import { Box, Button, Container, Flex, Text } from '@mantine/core';
import { IconArrowRightRhombus, IconCheck, IconWallet } from '@tabler/icons';
import { useMoralis } from 'react-moralis';
import StepsBox from './StepsBox';

const ConnectWalletStep = () => {
    const { isAuthenticated } = useMoralis();
    return (
        <StepsBox style={isAuthenticated ? {border: '2px solid #42ca9f'} : {border: '2px solid white'}}>
            <Flex
                direction='row'
                align='center'
                justify='space-between'
                sx={(theme) => ({
                    marginLeft: 15,
                })}
            >
                <Flex
                    direction='row'
                    align='center'
                >
                    <IconWallet size={35} color={isAuthenticated ? '#42ca9f' : 'white'} />
                    <Text
                        color={isAuthenticated ? '#42ca9f' : 'white'}
                        sx={(theme) => ({
                            margin: '20px 0px 20px 25px',
                            fontSize: 20,
                            fontWeight: 500,

                            [theme.fn.smallerThan('sm')]: {
                                fontSize: 14,
                                margin: '20px 2px 20px 25px',
                            }
                        })}
                    >
                        Connect your wallet
                    </Text>
                    {isAuthenticated && (
                        <IconCheck style={{marginLeft: 5}} color='#42ca9f' />
                    )}
                </Flex>
                <ConnectWalletStepButton />
            </Flex>
        </StepsBox>
    );
}

export default ConnectWalletStep;