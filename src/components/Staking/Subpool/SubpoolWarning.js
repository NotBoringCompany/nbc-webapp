import BorderedBox from '@/components/BorderedBox/BorderedBox';
import { HeadingSix } from '@/components/Typography/Headings';
import { Flex, List, Text, createStyles } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';

// const useStyles = createStyles((theme) => ({
//   borderedBox: {
//     width: '60%',
//     [theme.fn.smallerThan('lg')]: {
//       width: '100%',
//     },
//   },
// }));

const useStyles = createStyles((theme) => ({
  borderedContainer: {
    marginTop: 10,
    marginLeft: 50,
    [theme.fn.smallerThan('lg')]: {
      width: '100%',
      marginLeft: 0,
      marginTop: 24,
    },
  },
}));

const SubpoolWarning = ({ stakingPoolData }) => {
  const { classes } = useStyles();
  return (
    <BorderedBox variant='red' className={classes.borderedContainer} p='lg'>
      <Flex gap='md' direction='row' align='center' justify='center' mb={10}>
        <IconAlertOctagon size={30} style={{ flexShrink: 0 }} color='#ca4242' />
        <HeadingSix order={2} color='red'>
          PLEASE PAY ATTENTION TO THE FOLLOWING
        </HeadingSix>
      </Flex>
      <Text size={22}>
        STAKING POOL START TIME:{' '}
        {new Date(stakingPoolData?.StartTime).toLocaleString()}
      </Text>
      <Text size={22} mb={30}>
        STAKING POOL END TIME:{' '}
        {new Date(stakingPoolData?.EndTime).toLocaleString()}
      </Text>
      <Text size={16} mb={15}>
        1. You are only allowed to unstake before the aforementioned start time.{' '}
        <br /> To unstake, click the {"'Unstake'"} button under SUBPOOL DATA.
      </Text>
      <Text size={16} mb={15}>
        2. If you sell ANY of your staked NFTs while the subpool is ongoing,
        your{' '}
        <Text span c='#ca4242'>
          subpool will be automatically banned
        </Text>{' '}
        and you will receive a{' '}
        <Text span c='#ca4242'>
          TEMPORARY BAN FROM STAKING.
        </Text>
      </Text>
      <Text size={16}>3. You can only claim the subpool{"'s"} reward IF:</Text>
      <List center my={5}>
        <List.Item>The staking pool has ended</List.Item>
        <List.Item>Your subpool isn{"'t"} banned</List.Item>
        <List.Item>You have not unstaked</List.Item>
      </List>
    </BorderedBox>
  );
};

export default SubpoolWarning;
