import Layout from '@/components/Layout/Layout';
import { MySubpool, MySubpoolText, MySubpoolTooltip } from '@/components/Staking/Subpool/MySubpools';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const MySubpools = () => {
  const { user } = useMoralis();
  const router = useRouter();
  const [stakerSubpools, setStakerSubpools] = useState(null);

  const fetchStakerSubpools = useCallback(async () => {
    const subpoolRawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/get-staker-subpools/${
        user && user.attributes.ethAddress
      }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const subpoolRes = await subpoolRawRes.json();

    setStakerSubpools(subpoolRes?.data?.stakerSubpools);
  }, [user]);

  useEffect(() => {
    if (user && user.attributes.ethAddress) {
      fetchStakerSubpools();
    }
  }, [fetchStakerSubpools, user, user?.attributes.ethAddress]);

  return (
    <Layout
      pageTitle={'My Subpools'}
      description={`All the subpools you've staked will be shown here.`}
      withAuth
    >
      <Flex direction='column' align='center' justify='center'>
        <Text
          sx={() => ({
            fontSize: 72,
            fontWeight: 700,
            color: '#42ca9f',
          })}
        >
          MY SUBPOOLS
        </Text>
        <Flex gap='md' px={10} py={10} align='center'>
          <IconAlertOctagon size={30} />
          <Text size={24}>
            All the subpools you{"'"}ve staked will be shown here.
          </Text>
        </Flex>
        <Box
          sx={(theme) => ({
            border: '3px solid #42ca9f',
            marginTop: 80,
            borderRadius: theme.radius.xl,
            textAlign: 'center',
            minWidth: '90%',
          })}
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
                  <MySubpoolText pool={pool} title='Staking Pool ID' text={pool.StakingPoolID} />
                  <MySubpoolText pool={pool} title='Subpool ID' text={pool.SubpoolID} />
                  <MySubpoolText pool={pool} title='Enter Time' text={new Date(pool.EnterTime).toLocaleString()} />
                  <MySubpoolText pool={pool} title='Subpool Points' text={pool.SubpoolPoints} />
                  <MySubpoolText pool={pool} title='Keys Staked' text={pool.StakedKeys.length} />
                  <MySubpoolText pool={pool} title='Keychain(s) Staked?' text={pool.StakedKeychainIDs?.length > 0 ? 'Yes' : 'No'} />
                  <MySubpoolText pool={pool} title='Sup. Keychain Staked?' text={pool.StakedSuperiorKeychainID !== -1 ? 'Yes' : 'No'} />
                  <MySubpoolText pool={pool} title='Claimable?' text={pool.RewardClaimed ? 'Yes' : 'No'} />
                  <MySubpoolTooltip rewardClaimable={pool.RewardClaimable} rewardClaimed={pool.RewardClaimed} />
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
        </Box>
      </Flex>
    </Layout>
  );
};

export default MySubpools;
