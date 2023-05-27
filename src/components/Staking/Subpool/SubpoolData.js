import BorderedBox from '@/components/BorderedBox/BorderedBox';
import { MediumButton } from '@/components/Buttons/Universals';
import { HeadingFour } from '@/components/Typography/Headings';
import {
  Button,
  Flex,
  HoverCard,
  Text,
  createStyles,
} from '@mantine/core';
import { IconAlertOctagon, IconQuestionCircle } from '@tabler/icons';
import MathJax from 'react-mathjax2';
import { useMoralis } from 'react-moralis';
import { IndividualPoolDataText } from '../StakingPool/IndividualPool';

const useStyles = createStyles((theme) => ({
  borderedBox: {
    width: '50%',
    [theme.fn.smallerThan('lg')]: {
      width: '100%',
    },
  },
}));

const SubpoolData = ({
  subpoolData,
  stakingPoolData,
  userOwnsThisSubpool,
  backtrackSubpoolPoints,
  subpoolTokenShare,
  handleClaimModal,
  handleUnstakeModal,
}) => {
  const now = new Date().getTime();
  const { user } = useMoralis();
  const { classes } = useStyles();

  return (
    <BorderedBox className={classes.borderedBox} p='lg' variant='green'>
      <HeadingFour order={2} align='center' my='lg'>
        SUBPOOL DATA
      </HeadingFour>
      <Flex
        direction='column'
        align='center'
        justify='center'
        sx={(theme) => ({
          marginBottom: 20,
        })}
      >
        <Text c='#42ca9f' size={20} weight={600}>
          ENTERED: {new Date(subpoolData.enterTime * 1000).toLocaleString()}
        </Text>
      </Flex>
      <Flex
        direction='row'
        align='center'
        justify='center'
        sx={(theme) => ({
          marginBottom: 20,
        })}
      >
        {userOwnsThisSubpool && (
          <>
            <MediumButton
              color='#42ca9f'
              hoverColor='#42ca9f'
              onClick={handleUnstakeModal}
              disabled={
                now > new Date(stakingPoolData.StartTime).getTime() || !user
              }
            >
              Unstake
            </MediumButton>
            <MediumButton
              color='#42ca9f'
              hoverColor='#42ca9f'
              margin='0 0 0 10px'
              onClick={handleClaimModal}
              disabled={
                !subpoolData.rewardClaimable || subpoolData.rewardClaimed
              }
            >
              {subpoolData.rewardClaimable
                ? subpoolData.rewardClaimed
                  ? 'Reward Claimed'
                  : 'Claim Reward'
                : 'Not Claimable'}
            </MediumButton>
          </>
        )}
      </Flex>
      <IndividualPoolDataText
        text={`${subpoolData.subpoolPoints} POINTS`}
        title='SUBPOOL POINTS'
        extraComponent={
          <>
            <HoverCard width={350} shadow='md'>
              <HoverCard.Target>
                <Button
                  sx={() => ({
                    backgroundColor: '#000000',
                    ':hover': {
                      backgroundColor: '#000000',
                    },
                  })}
                  size='xs'
                >
                  <IconQuestionCircle />
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex direction='column' align='center' justify='center'>
                  <Text>
                    Luck/Luck Boost Bonus:{' '}
                    {backtrackSubpoolPoints.luckAndLuckBoostSum}
                  </Text>
                  <Text>
                    Angel Multiplier: {backtrackSubpoolPoints.angelMultiplier}
                  </Text>
                  <Text>
                    Key Combo Bonus: {backtrackSubpoolPoints.keyCombo}
                  </Text>
                  <Text>
                    Keychain Combo Bonus: {backtrackSubpoolPoints.keychainCombo}
                  </Text>
                  <Text mt={20} mb={10} size={20} weight={600} underline>
                    TOTAL SUBPOOL POINTS
                  </Text>
                  <MathJax.Context input='tex'>
                    <MathJax.Node
                      inline
                    >{`\\left(100\\ +\\ \\left(${backtrackSubpoolPoints.luckAndLuckBoostSum}\\right)^{${backtrackSubpoolPoints.angelMultiplier}}\\ +\\ ${backtrackSubpoolPoints.keyCombo}\\right)\\ \\cdot\\ ${backtrackSubpoolPoints.keychainCombo}`}</MathJax.Node>
                  </MathJax.Context>
                  <MathJax.Context input='tex'>
                    <MathJax.Node
                      inline
                    >{`=${backtrackSubpoolPoints.totalSubpoolPoints}`}</MathJax.Node>
                  </MathJax.Context>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
          </>
        }
      />
      <IndividualPoolDataText
        text={`${subpoolTokenShare} ${stakingPoolData.Reward.Name}`}
        title='SUBPOOL REWARD SHARE'
      />
    </BorderedBox>
  );
};

export default SubpoolData;
