import { Button, Flex, Loader, Modal, Text } from "@mantine/core";
import { IconAlertOctagon } from "@tabler/icons";
import { useEffect, useState } from "react";

const WrongNetwork = ({ switchNetworkLoading, handleSwitchNetwork, showWrongNetworkModal, setShowWrongNetworkModal }) => {
    // // for now, we only accept eth mainnet. we check if the user is connected to ETH, otherwise we require them to change.
    // const wrongNetwork = isAuthenticated && chainId !== '0x1';
    // const [switchNetworkLoading, setSwitchNetworkLoading] = useState(false);
  
    // const handleSwitchNetwork = async () => {
    //     setSwitchNetworkLoading(true);

    //     if (isAuthenticated && isWeb3Enabled) {
    //         await switchNetwork('0x1');
    //     } else {
    //         await enableWeb3({ network: 'mainnet' });
    //     }

    //     setShowWrongNetworkModal(false);
    // }

    // useEffect(() => {
    //     if (switchNetworkLoading) {
    //         if (chainId === '0x1') {
    //             setSwitchNetworkLoading(false);
    //             setShowWrongNetworkModal(false);
    //         }
    //     }

    //     if (chainId !== '0x1') {
    //         setShowWrongNetworkModal(true);
    //     }
    // }, [chainId, switchNetworkLoading, setShowWrongNetworkModal])

    return (
        <Modal
            opened={showWrongNetworkModal}
            centered
            onClose={() => setShowWrongNetworkModal(false)}
            title={
                <Text size={24}>
                    Wrong Network
                </Text>
            }
            withCloseButton={false}
        >
            <>
                <Flex direction='column' align='center' justify='center'>
                <IconAlertOctagon size={40} style={{ marginRight: 10 }} color='#ca4242' />
                <Text size={18} c='#ca4242'>
                    You are not connected to Ethereum Mainnet. Change your network or click the button below to change it.
                </Text>
                </Flex>
                <Flex direction='row' align='center' justify='center' mt={15}>
                <Button
                    size='sm'
                    sx={(theme) => ({
                    backgroundColor: '#42ca9f',
                    minHeight: '40px',
                    minWidth: '5vw',

                    '&:hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                    },

                    '&:active': {
                        transform: 'translateY(2px)',
                    },
                    })}
                    onClick={handleSwitchNetwork}
                >
                    {switchNetworkLoading ? <Loader color='white' /> : <Text>Switch Network</Text>}
                </Button>
                </Flex>
            </>
        </Modal>
    )
}

export default WrongNetwork