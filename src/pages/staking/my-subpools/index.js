import BorderedBox from '@/components/BorderedBox/BorderedBox';
import { COLORS } from '@/components/Globals/colors';
import Layout from '@/components/Layout/Layout';
import { PoolComponent } from '@/components/Staking/StakingPool/StakingPoolData';
import { HeadingOne } from '@/components/Typography/Headings';
import { Button, Divider, Flex, Text, Title } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const claimableBadge = (claimable, claimed) => {
  if (!claimable) {
    return { text: 'NOT AVAILABLE', backgroundColor: COLORS.red };
  }

  if (claimable && !claimed) {
    return { text: 'CLAIMABLE', backgroundColor: COLORS.green };
  }

  if (claimed) {
    return { text: 'CLAIMED', backgroundColor: 'grey' };
  }
};

const MySubpools = () => {
  const { user } = useMoralis();
  const router = useRouter();
  const [stakerSubpools, setStakerSubpools] = useState(null);

  const fetchStakerSubpools = useCallback(async () => {
    const subpoolRawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/get-staker-subpools/${user?.attributes?.ethAddress}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const subpoolRes = await subpoolRawRes.json();

    setStakerSubpools(subpoolRes?.data?.stakerSubpools);
  }, [user]);

  useEffect(() => {
    if (user?.attributes?.ethAddress) {
      fetchStakerSubpools();
    }
  }, [fetchStakerSubpools, user, user?.attributes.ethAddress]);

  return (
    <Layout
      pageTitle={'My Subpools'}
      description={`All the subpools you've staked will be shown here.`}
      withAuth
    >
      <Flex w='100%' direction='column' align='center'>
        <HeadingOne mb={24}>MY SUBPOOLS</HeadingOne>
        <Flex gap='md' px={10} py={10} align='center'>
          <IconAlertOctagon style={{ flexShrink: 0 }} size={30} />
          <Text size={24}>
            All the subpools you{"'"}ve staked will be shown here.
          </Text>
        </Flex>
        <BorderedBox
          sx={{ marginTop: 80, minWidth: '100%' }}
          p='md'
          variant='green'
        >
          <Text sx={{ marginTop: 25, marginBottom: 5 }} size={24} weight={600}>
            SUBPOOL LIST
          </Text>
          <Divider
            color='#42ca9f'
            style={{
              width: '20%',
              margin: '0 auto',
            }}
          />
          {!stakerSubpools && (
            <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
              You don{"'"}t have any subpools yet. Go to the staking page and
              stake now.
            </Text>
          )}
          {stakerSubpools?.length > 0 &&
            stakerSubpools.map((pool, index) => (
              <Fragment key={pool.StakingPoolID}>
                <Flex
                  direction='row'
                  align='center'
                  justify={'space-between'}
                  sx={(theme) => ({
                    padding: '20px 20px',
                  })}
                >
                  <PoolComponent
                    pool={pool}
                    title='Staking Pool ID'
                    text={pool.StakingPoolID}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Subpool ID'
                    text={pool.SubpoolID}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Enter Time'
                    text={new Date(pool.EnterTime).toLocaleString()}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Subpool Points'
                    text={pool.SubpoolPoints}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Keys Staked'
                    text={pool.StakedKeys.length}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Keychain(s) Staked?'
                    text={pool.StakedKeychainIDs?.length > 0 ? 'Yes' : 'No'}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Sup. Keychain Staked?'
                    text={pool.StakedSuperiorKeychainID !== -1 ? 'Yes' : 'No'}
                  />
                  <PoolComponent
                    pool={pool}
                    title='Claimable?'
                    badgeContent={
                      claimableBadge(pool.RewardClaimable, pool.RewardClaimed)
                        .text
                    }
                    badgeBgColor={
                      claimableBadge(pool.RewardClaimable, pool.RewardClaimed)
                        .backgroundColor
                    }
                  />
                  <Button
                    size='md'
                    radius='md'
                    sx={(theme) => ({
                      backgroundColor: '#42ca9f',
                      marginLeft: 15,
                      ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                      },
                    })}
                    onClick={() =>
                      router.replace(
                        `/staking/subpools/${pool.StakingPoolID}/${pool.SubpoolID}`
                      )
                    }
                  >
                    Visit Subpool
                  </Button>
                </Flex>
                {index !== stakerSubpools.length - 1 && (
                  <Divider color='#42ca9f' />
                )}
              </Fragment>
            ))}
        </BorderedBox>
      </Flex>
    </Layout>
  );
};

export default MySubpools;
