import { Button, Flex, Loader, Modal, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { cardColumnsBreakpoints } from '@/components/Breakpoints/CardColumns';
import SubpoolWarning from './SubpoolWarning';
import SubpoolData from './SubpoolData';
import NFTStaked from './NFTStaked';
import BorderedBox from '@/components/BorderedBox/BorderedBox';
import ClaimModal from '@/components/Modals/ClaimModal';
import UnstakeModal from '@/components/Modals/UnstakeModal';

const Subpool = ({
  subpoolDataExists,
  subpoolData,
  stakingPoolData,
  stakingPoolId,
  subpoolId,
  userOwnsThisSubpool,
  backtrackSubpoolPoints,
  subpoolTokenShare,
  showClaimModal,
  claimDone,
  handleClaimReward,
  claimLoading,
  showUnstakeModal,
  unstakeDone,
  handleUnstake,
  unstakeLoading,
  setShowClaimModal,
  setShowUnstakeModal,
  handleClaimModal,
  handleUnstakeModal,
}) => {
  return (
    <Flex direction='column' align='center' justify='center'>
      {!subpoolDataExists && (
        <BorderedBox
          variant='red'
          borderRadiusSize='md'
          withPadding
          sx={{
            marginTop: 15,
          }}
        >
          <Flex direction='row' align='center' justify='center'>
            <IconAlertOctagon
              color='#ca4242'
              size={40}
              style={{ marginRight: 10 }}
            />
            <Text
              sx={(theme) => ({
                fontSize: 40,
                color: '#ca4242',
                fontWeight: 700,
              })}
            >
              SUBPOOL PAGE NOT AVAILABLE
            </Text>
          </Flex>
          <Text size='lg'>
            This subpool might not exist or is not available.
          </Text>
        </BorderedBox>
      )}
      {subpoolDataExists && (
        <>
          <Text
            sx={{
              fontSize: 72,
              fontWeight: 700,
              color: '#42ca9f',
            }}
          >
            Staking Pool {stakingPoolId} {'<>'} Subpool {subpoolId}
          </Text>
          <Flex direction='row' align='center' justify='center' my={25}>
            <SubpoolData
              subpoolData={subpoolData}
              stakingPoolData={stakingPoolData}
              userOwnsThisSubpool={userOwnsThisSubpool}
              backtrackSubpoolPoints={backtrackSubpoolPoints}
              subpoolTokenShare={subpoolTokenShare}
              handleClaimModal={handleClaimModal}
              handleUnstakeModal={handleUnstakeModal}
            />
            <SubpoolWarning stakingPoolData={stakingPoolData} />
          </Flex>
          <NFTStaked
            subpoolData={subpoolData}
            cardColumnsBreakpoints={cardColumnsBreakpoints}
          />
        </>
      )}
      <ClaimModal
        handleClaimReward={handleClaimReward}
        onClose={() => setShowClaimModal(false)}
        opened={showClaimModal}
        claimDone={claimDone}
        claimLoading={claimLoading}
        rewardName={stakingPoolData.Reward.Name}
        loading={subpoolTokenShare}
      />

      <UnstakeModal
        opened={showUnstakeModal}
        unstakeDone={unstakeDone}
        onClose={() => setShowUnstakeModal(false)}
        handleUnstake={handleUnstake}
        loading={unstakeLoading}
      />
    </Flex>
  );
};

export default Subpool;
