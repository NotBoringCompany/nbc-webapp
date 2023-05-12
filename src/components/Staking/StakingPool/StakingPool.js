import { Divider, Text } from '@mantine/core';
import RECToken from '../../../../public/recToken.png';
import StakingPoolData from './StakingPoolData';
import BorderedBox from '@/components/BorderedBox/BorderedBox';

const StakingPool = ({
  isActive,
  isClosed,
  stakeablePools,
  ongoingPools,
  closedPools,
}) => {
  const noActiveStakingPool = isActive && !stakeablePools && !ongoingPools;
  const hasStakablePools = isActive && stakeablePools;
  const hasOngoingStakingPools = isActive && ongoingPools;
  const hasNoClosedStakingPools = isClosed && !closedPools;
  const hasClosedStakingPools = isClosed && closedPools;

  const variant = isActive ? 'green' : 'grey';

  return (
    <BorderedBox sx={{ marginTop: 80 }} variant={variant}>
      <Text sx={{ marginTop: 25, marginBottom: 5 }} size={24} weight={600}>
        {isActive ? 'ACTIVE STAKING POOLS' : 'CLOSED STAKING POOLS'}
      </Text>
      <Divider
        color={isActive ? '#42ca9f' : 'grey'}
        style={{
          width: '20%',
          margin: '0 auto',
        }}
      />
      {noActiveStakingPool && (
        <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
          There are currently no active staking pools to stake in.
        </Text>
      )}
      {hasStakablePools &&
        stakeablePools.map((pool) => (
          <StakingPoolData
            key={pool.StakingPoolID}
            image={RECToken}
            imageAlt='recToken'
            tokenName='REC Token'
            pool={pool}
            active
          />
        ))}
      {hasOngoingStakingPools &&
        ongoingPools.map((pool) => (
          <StakingPoolData
            key={pool.StakingPoolID}
            image={RECToken}
            imageAlt='recToken'
            tokenName='REC Token'
            pool={pool}
            ongoing
          />
        ))}
      {hasNoClosedStakingPools && (
        <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
          There are currently no closed staking pools.
        </Text>
      )}
      {hasClosedStakingPools &&
        closedPools.map((pool) => (
          <StakingPoolData
            key={pool.StakingPoolID}
            image={RECToken}
            alt='recToken'
            tokenName='REC Token'
            pool={pool}
            closed
          />
        ))}
    </BorderedBox>
  );
};

export default StakingPool;
