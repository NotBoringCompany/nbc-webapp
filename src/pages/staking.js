import { Flex, Text } from '@mantine/core';
import Layout from '@/components/Layout/Layout';
import { useRouter } from 'next/router';
import StakingPool from '@/components/Staking/StakingPool/StakingPool';

export default function Staking({ stakingPoolData }) {
  const router = useRouter();

  const stakeablePools = stakingPoolData.stakeablePools;
  const ongoingPools = stakingPoolData.ongoingPools;
  const closedPools = stakingPoolData.closedPools;

  return (
    <Layout
      pageTitle='Staking Pools'
      description='Stake your Factory NFTs to earn special yields and rewards!'
      withAuth
    >
      <Flex
        direction='column'
        align='center'
        sx={(theme) => ({
          marginTop: 40,
        })}
      >
        <Text c='#42ca9f' size={60} weight={700}>
          STAKING POOLS
        </Text>
        <Text size={24}>Stake your Factory NFTs to earn special yields.</Text>
        <StakingPool 
          isActive
          stakeablePools={stakeablePools}
          ongoingPools={ongoingPools}
        />
        <StakingPool
          isClosed
          closedPools={closedPools}
        />
      </Flex>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const stakingPoolDataRawResponse = await fetch(
    `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staking-pools`,
    {
      method: 'GET',
      headers: {
        Accept: '*',
        'Content-Type': 'application/json',
      },
    }
  ).catch((err) => console.log(err));

  const stakingPoolDataResponse = await stakingPoolDataRawResponse.json();
  const stakingPoolData = stakingPoolDataResponse.data.stakingPools;

  return {
    props: {
      stakingPoolData,
    },
  };
}
