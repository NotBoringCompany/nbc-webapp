import { Badge, Button, Flex, Text, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  stakingPoolsContainer: {
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
      padding: '16px',
    },
  },
  poolComponent: {
    margin: '0 20px',
    fontWeight: 700,
    fontSize: 18,
    [theme.fn.smallerThan('md')]: {
      margin: 0,
    },
  },
  withMarginTop: {
    [theme.fn.smallerThan('md')]: {
      marginTop: '20px',
    },
  },
}));

export const PoolComponent = ({
  title,
  text,
  badgeContent,
  badgeColor,
  badgeBgColor,
}) => {
  const { classes } = useStyles();
  return (
    <Flex direction='column' align='center'>
      <Text className={[classes.poolComponent, classes.withMarginTop]}>
        {title}
      </Text>
      {text && <Text>{text}</Text>}
      {badgeContent && (
        <Badge
          c={badgeColor}
          sx={{
            backgroundColor: badgeBgColor,
            marginTop: 5,
            color: 'white',
            textAlign: 'center',
          }}
        >
          {badgeContent}
        </Badge>
      )}
    </Flex>
  );
};

const StakingPoolData = ({
  image,
  imageAlt = '',
  tokenName,
  pool,
  active,
  ongoing,
  closed,
}) => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Flex
      direction='row'
      align='center'
      justify='space-between'
      className={classes.stakingPoolsContainer}
      sx={(theme) => ({
        padding: '20px 20px',
      })}
    >
      <Image src={image} width={60} alt={imageAlt} />
      <Text
        size={24}
        weight={700}
        sx={{
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {tokenName}
      </Text>
      <PoolComponent title='Staking Pool ID' text={pool.StakingPoolID} />
      <PoolComponent
        title='Entry Until'
        text={new Date(pool.StartTime)
          .toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })
          .replace(/24/, '00')}
      />
      <PoolComponent
        title='Ends At'
        text={new Date(pool.EndTime)
          .toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })
          .replace(/24/, '00')}
      />
      <PoolComponent title='Total Reward' text={pool.Reward?.Amount} />
      <PoolComponent
        title='Status'
        badgeContent={
          active ? 'STAKEABLE' : ongoing ? 'ONGOING' : closed ? 'CLOSED' : ''
        }
        badgeColor={active || ongoing ? 'white' : ''}
        badgeBgColor={
          active ? '#42ca9f' : ongoing ? '#ca4242' : closed ? '#grey' : ''
        }
      />
      <PoolComponent
        title='Total Subpool Points'
        text={pool.TotalYieldPoints}
      />
      <Button
        className={classes.withMarginTop}
        sx={(theme) => ({
          backgroundColor: theme.colors.nbcGreen,
          ':hover': {
            transform: 'scale(1.01) translate(1px, -3px)',
            transitionDuration: '200ms',
            backgroundColor: '#42ca9f',
          },
        })}
        onClick={() => router.push(`/staking/pools/${pool.StakingPoolID}`)}
      >
        View Pool
      </Button>
    </Flex>
  );
};

export default StakingPoolData;
