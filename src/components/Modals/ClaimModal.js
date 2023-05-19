import React from 'react';
import { Modal, Text, Flex, Button, Loader } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
const ClaimModal = ({
  handleClaimReward,
  opened,
  onClose,
  claimDone,
  subpoolTokenShare,
  rewardName,
  claimLoading,
}) => {
  return (
    <Modal
      opened={opened}
      centered
      onClose={onClose}
      title={
        <Text size={24}>{!claimDone ? 'Claim Reward' : 'Reward Claimed'}</Text>
      }
      withCloseButton={false}
    >
      {!claimDone && (
        <>
          <Flex direction='row'>
            <IconAlertOctagon size={30} style={{ marginRight: 10 }} />
            <Text size={16}>
              Claiming {subpoolTokenShare} {rewardName}. Proceed?
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
              onClick={handleClaimReward}
            >
              {claimLoading ? <Loader color='white' /> : <Text>Confirm</Text>}
            </Button>
          </Flex>
        </>
      )}
      {claimDone && (
        <>
          <Flex direction='row'>
            <Text size={16}>Reward claimed successfully! Redirecting...</Text>
          </Flex>
        </>
      )}
    </Modal>
  );
};

export default ClaimModal;
