import ConnectWalletStepButton from '@/components/Buttons/ConnectWalletStep';
import { Box, Button, Container, Flex } from '@mantine/core';
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
                    <h3 style={{marginLeft: 30}}>Connect your wallet</h3>
                </Flex>
                <ConnectWalletStepButton />
            </Flex>
        </Box>
    );
}

export default ConnectWalletStep;