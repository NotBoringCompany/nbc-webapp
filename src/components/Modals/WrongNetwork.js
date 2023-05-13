import { Button, Flex, Loader, Modal, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';

const NETWORK_CHAIN_ID = '0x1';

const WrongNetwork = () => {
  const { chainId, switchNetwork } = useChain();
  const [opened, setOpened] = useState(false);
  const { isWeb3Enabled, enableWeb3 } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3({ provider: 'metamask' });
      return;
    }

    if (isWeb3Enabled && chainId) {
      setOpened(chainId !== NETWORK_CHAIN_ID);
    }
  }, [isWeb3Enabled, enableWeb3, chainId]);

  const handleSwitchNetwork = () => {
    switchNetwork(NETWORK_CHAIN_ID);
  };

  return (
    <Modal
      opened={opened}
      centered
      closeOnClickOutside={false}
      title={<Text size={24}>Wrong Network</Text>}
      withCloseButton={false}
    >
      <>
        <Flex direction='column' align='center' justify='center'>
          <IconAlertOctagon
            size={40}
            style={{ marginRight: 10 }}
            color='#ca4242'
          />
          <Text size={18} c='#ca4242'>
            You are not connected to Ethereum Mainnet. Change your network or
            click the button below to change it.
          </Text>
        </Flex>
        <Flex direction='row' align='center' justify='center' mt={15}>
          <Button
            size='sm'
            sx={{
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
            }}
            onClick={handleSwitchNetwork}
          >
            {1 === 3 ? <Loader color='white' /> : <Text>Switch Network</Text>}
          </Button>
        </Flex>
      </>
    </Modal>
  );
};

export default WrongNetwork;
