import { Box, Divider, Flex, Text } from '@mantine/core';
import Image from 'next/image';
import RECToken from '../../../../public/recToken.png';
import { Fragment } from 'react';
import StakingPoolData from './StakingPoolData';

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

  return (
    <Box
      sx={(theme) => ({
        border: `3px solid ${isActive ? '#42ca9f' : 'grey'}`,
        marginTop: 80,
        borderRadius: theme.radius.xl,
        textAlign: 'center',
        minWidth: '50%',
      })}
    >
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
    </Box>
  );
};

export default StakingPool;
