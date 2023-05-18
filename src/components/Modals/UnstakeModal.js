import React from 'react';
import {
  Modal,
  Text,
  Flex,
  IconAlertOctagon,
  Button,
  Loader,
} from '@mantine/core';

const UnstakeModal = ({
  opened,
  unstakeDone,
  onClose,
  handleUnstake,
  loading,
}) => {
  return (
    <Modal
      opened={opened}
      centered
      onClose={onClose}
      title={
        <Text size={24}>
          {!unstakeDone ? 'Confirm Unstake' : 'Unstake Successful'}
        </Text>
      }
      withCloseButton={false}
    >
      {!unstakeDone && (
        <>
          <Flex direction='row'>
            <IconAlertOctagon
              size={30}
              color='#ca4242'
              style={{ marginRight: 10 }}
            />
            <Text c='#ca4242' size={16}>
              WARNING: Unstaking will remove this subpool. Are you sure you want
              to continue?
            </Text>
          </Flex>
          <Flex direction='row' align='center' justify='center' mt={15}>
            <Button
              size='sm'
              sx={(theme) => ({
                backgroundColor: '#ca4242',
                minHeight: '40px',
                minWidth: '5vw',

                '&:hover': {
                  transform: 'scale(1.01) translate(1px, -3px)',
                  transitionDuration: '200ms',
                  backgroundColor: '#ca4242',
                },

                '&:active': {
                  transform: 'translateY(2px)',
                },
              })}
              onClick={handleUnstake}
            >
              {loading ? <Loader color='white' /> : <Text>Confirm</Text>}
            </Button>
          </Flex>
        </>
      )}
      {unstakeDone && (
        <>
          <Flex direction='row'>
            <Text size={16}>Unstake successful! Redirecting...</Text>
          </Flex>
        </>
      )}
    </Modal>
  );
};

export default UnstakeModal;
