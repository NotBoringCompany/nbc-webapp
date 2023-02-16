import { Box, Flex } from '@mantine/core';
import { IconWallet } from '@tabler/icons';

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
                sx={(theme) => ({
                    marginLeft: 15,
                })}
            >
                <IconWallet size={35} />
                <h3 style={{marginLeft: 30}}>Connect your wallet</h3>
            </Flex>
        </Box>
    );
}

export default ConnectWalletStep;