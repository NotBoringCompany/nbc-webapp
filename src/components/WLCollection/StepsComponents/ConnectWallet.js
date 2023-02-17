import ConnectWalletStepButton from '@/components/Buttons/ConnectWalletStep';
import { Box, Button, Container, Flex, Text } from '@mantine/core';
import { IconArrowRightRhombus, IconWallet } from '@tabler/icons';
import { useMoralis } from 'react-moralis';

const ConnectWalletStep = () => {
    return (
        <Box
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '100%',
                textAlign: 'center',
                borderBottom: '2px solid #42ca9f',
                borderRight: '2px solid #42ca9f',
                borderTop: '2px solid #42ca9f',
                borderLeft: '2px solid #42ca9f',
                marginBottom: 15,
            })}
        >
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
                    <IconWallet size={35} />
                    <Text 
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
                </Flex>
                <ConnectWalletStepButton />
            </Flex>
        </Box>
    );
}

export default ConnectWalletStep;