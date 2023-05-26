import BorderedBox from '@/components/BorderedBox/BorderedBox';
import { Flex, Text, Collapse } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { IndividualPoolDataText } from './IndividualPool';
import { HeadingFour } from '@/components/Typography/Headings';
import { MediumButton } from '@/components/Buttons/Universals';
import { useDisclosure } from '@mantine/hooks';

const StakingPoolDataDetail = ({
  stakingPoolData,
  activeSubpoolsLength,
  closedSubpoolsLength,
  stakerTotalSubpoolPoints,
  totalTokenShare,
  stakerCount,
  ...props
}) => {
  const [openDetail, { toggle: toggleOpenDetail }] = useDisclosure(false);

  return (
    <BorderedBox
      borderRadiusSize='md'
      p='lg'
      sx={{ textAlign: 'center' }}
      variant='green'
      {...props}
    >
      <Flex
        direction='row'
        align='center'
        justify='center'
        sx={(theme) => ({
          marginBottom: 20,
        })}
      >
        <HeadingFour order={2}>STAKING POOL DATA</HeadingFour>
      </Flex>
      <Flex
        direction='column'
        align='center'
        justify='center'
        sx={(theme) => ({
          marginBottom: 20,
        })}
      >
        <Text c='#42ca9f' size={20} weight={600}>
          ENTRY: {new Date(stakingPoolData.EntryAllowance).toLocaleString()}
        </Text>
        <Text c='#42ca9f' size={20} weight={600}>
          STARTS: {new Date(stakingPoolData.StartTime).toLocaleString()}
        </Text>
        <Text c='#42ca9f' size={20} weight={600}>
          ENDS: {new Date(stakingPoolData.EndTime).toLocaleString()}
        </Text>
      </Flex>
      <MediumButton onClick={toggleOpenDetail} color='transparent'>
        <Text size={14} color='#42ca9f'>
          {openDetail ? 'Hide' : 'Show'} staking pool data
        </Text>
        {openDetail ? (
          <IconChevronUp color='#42ca9f' />
        ) : (
          <IconChevronDown color='#42ca9f' />
        )}
      </MediumButton>
      <Collapse in={openDetail}>
        <IndividualPoolDataText
          title='TOTAL POOL REWARD'
          text={`${stakingPoolData.Reward.Amount} ${stakingPoolData.Reward.Name}`}
        />
        <IndividualPoolDataText
          title='TOTAL SUBPOOL POINTS'
          text={`${stakingPoolData.TotalYieldPoints} points`}
        />
        <IndividualPoolDataText
          title='TOTAL SUBPOOLS'
          text={`${activeSubpoolsLength + closedSubpoolsLength} subpool(s)`}
        />
        <IndividualPoolDataText
          title='TOTAL STAKERS'
          text={`${stakerCount} staker(s)`}
        />
        <IndividualPoolDataText
          title='YOUR SUBPOOL POINTS'
          text={`${stakerTotalSubpoolPoints} points`}
        />
        <IndividualPoolDataText
          title='YOUR TOTAL REWARD SHARE'
          text={`${totalTokenShare} ${stakingPoolData.Reward.Name}`}
        />
      </Collapse>
    </BorderedBox>
  );
};

export default StakingPoolDataDetail;
