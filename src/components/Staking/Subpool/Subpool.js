import { Flex, createStyles } from '@mantine/core';
import { cardColumnsBreakpoints } from '@/components/Breakpoints/CardColumns';
import SubpoolWarning from './SubpoolWarning';
import SubpoolData from './SubpoolData';
import NFTStaked from './NFTStaked';
import ClaimModal from '@/components/Modals/ClaimModal';
import UnstakeModal from '@/components/Modals/UnstakeModal';
import { HeadingOne } from '@/components/Typography/Headings';

const useStyles = createStyles((theme) => ({
  flexContainer: {
    display: 'row',
    [theme.fn.smallerThan('lg')]: {
      flexDirection: 'column',
    },
  },
}));

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
  const { classes } = useStyles();

  return (
    <Flex direction='column' align='center' justify='center'>
      {subpoolDataExists && (
        <>
          <HeadingOne mb='lg' align='center'>
            Staking Pool {stakingPoolId} {'<>'} Subpool {subpoolId}
          </HeadingOne>
          <Flex
            direction='row'
            className={classes.flexContainer}
            align='center'
            justify='center'
            my={25}
          >
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
