import { Fragment } from 'react';
import { Badge, Box, Button, Divider, Flex, Text } from '@mantine/core';
import Layout from '@/components/Layout/Layout';
import RECToken from '../../public/recToken.png';
import Image from 'next/image';
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
        {/* <Box
          sx={(theme) => ({
            border: '3px solid #42ca9f',
            marginTop: 80,
            borderRadius: theme.radius.xl,
            textAlign: 'center',
            minWidth: '50%',
          })}
        >
          <Text sx={{ marginTop: 25, marginBottom: 5 }} size={24} weight={600}>
            ACTIVE STAKING POOLS
          </Text>
          <Divider
            color='#42ca9f'
            style={{
              width: '20%',
              margin: '0 auto',
            }}
          />
          {!stakeablePools && !ongoingPools && (
            <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
              There are currently no active staking pools to stake in.
            </Text>
          )}

          {stakeablePools &&
            stakeablePools.map((pool) => (
              <Fragment key={pool.StakingPoolID}>
                <Divider
                  color='#42ca9f'
                  style={{
                    width: '20%',
                    margin: '0 auto',
                  }}
                />
                <Flex
                  direction='row'
                  align='center'
                  justify='space-between'
                  sx={(theme) => ({
                    padding: '20px 20px',
                  })}
                >
                  <Image src={RECToken} width={60} alt='recToken' />
                  <Text
                    size={24}
                    weight={700}
                    sx={{
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    REC Token
                  </Text>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Staking Pool ID
                    </Text>
                    <Text>{pool.StakingPoolID}</Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Entry Until
                    </Text>
                    <Text>
                      {new Date(pool.StartTime)
                        .toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        })
                        .replace(/24/, '00')}
                    </Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Ends At
                    </Text>
                    <Text>
                      {new Date(pool.EndTime)
                        .toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        })
                        .replace(/24/, '00')}
                    </Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Total Reward
                    </Text>
                    <Text>{pool.Reward.Amount}</Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 5,
                      }}
                    >
                      Status
                    </Text>
                    <Badge
                      c='white'
                      sx={(theme) => ({
                        backgroundColor: '#42ca9f',
                      })}
                    >
                      STAKEABLE
                    </Badge>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Total Subpool Points
                    </Text>
                    <Text>{pool.TotalYieldPoints}</Text>
                  </Flex>
                  <Button
                    sx={(theme) => ({
                      backgroundColor: '#42ca9f',
                      ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                      },
                    })}
                    onClick={() =>
                      router.push(`/staking/pools/${pool.StakingPoolID}`)
                    }
                  >
                    View Pool
                  </Button>
                </Flex>
              </Fragment>
            ))}
          {ongoingPools &&
            ongoingPools.map((pool) => (
              <Fragment key={pool.StakingPoolID}>
                <Flex
                  direction='row'
                  align='center'
                  justify='space-between'
                  sx={(theme) => ({
                    padding: '20px 20px',
                  })}
                >
                  <Image src={RECToken} width={60} alt='recToken' />
                  <Text
                    size={24}
                    weight={700}
                    sx={{
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    REC Token
                  </Text>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Staking Pool ID
                    </Text>
                    <Text>{pool.StakingPoolID}</Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Entry Until
                    </Text>
                    <Text>
                      {new Date(pool.StartTime)
                        .toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        })
                        .replace(/24/, '00')}
                    </Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Ends At
                    </Text>
                    <Text>
                      {new Date(pool.EndTime)
                        .toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        })
                        .replace(/24/, '00')}
                    </Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Total Reward
                    </Text>
                    <Text>{pool.Reward.Amount}</Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 5,
                      }}
                    >
                      Status
                    </Text>
                    <Badge
                      c='white'
                      sx={(theme) => ({
                        backgroundColor: '#ca4242',
                      })}
                    >
                      ONGOING
                    </Badge>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Total Subpool Points
                    </Text>
                    <Text>{pool.TotalYieldPoints}</Text>
                  </Flex>

                  <Button
                    sx={(theme) => ({
                      backgroundColor: '#42ca9f',
                      ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                      },
                    })}
                    onClick={() =>
                      router.push(`/staking/pools/${pool.StakingPoolID}`)
                    }
                  >
                    View Pool
                  </Button>
                </Flex>
              </Fragment>
            ))}
        </Box>
        <Box
          sx={(theme) => ({
            border: '3px solid grey',
            marginTop: 80,
            borderRadius: theme.radius.xl,
            color: 'grey',
            textAlign: 'center',
            minWidth: '50%',
          })}
        >
          <Text sx={{ marginTop: 25, marginBottom: 5 }} size={24} weight={600}>
            CLOSED STAKING POOLS
          </Text>
          <Divider
            color='grey'
            style={{
              width: '20%',
              margin: '0 auto',
            }}
          />
          {!closedPools && (
            <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
              There are currently no closed staking pools.
            </Text>
          )}
          {closedPools &&
            closedPools.map((pool) => (
              <Fragment key={pool.StakingPoolID}>
                <Flex
                  direction='row'
                  align='center'
                  justify='space-between'
                  sx={(theme) => ({
                    padding: '20px 20px',
                  })}
                >
                  <Image src={RECToken} width={60} alt='recToken' />
                  <Text
                    size={24}
                    weight={700}
                    sx={{
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    REC Token
                  </Text>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Staking Pool ID
                    </Text>
                    <Text>{pool.StakingPoolID}</Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Entry Until
                    </Text>
                    <Text>
                      {new Date(pool.StartTime)
                        .toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        })
                        .replace(/24/, '00')}
                    </Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Ends At
                    </Text>
                    <Text>
                      {new Date(pool.EndTime)
                        .toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        })
                        .replace(/24/, '00')}
                    </Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Total Reward
                    </Text>
                    <Text>{pool.Reward.Amount}</Text>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 5,
                      }}
                    >
                      Status
                    </Text>
                    <Badge
                      sx={(theme) => ({
                        backgroundColor: '#grey',
                      })}
                    >
                      CLOSED
                    </Badge>
                  </Flex>
                  <Flex direction='column' align='center'>
                    <Text
                      size={18}
                      weight={700}
                      sx={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      Total Subpool Points
                    </Text>
                    <Text>{pool.TotalYieldPoints}</Text>
                  </Flex>
                  <Button
                    sx={(theme) => ({
                      backgroundColor: '#42ca9f',
                      ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                      },
                    })}
                    onClick={() =>
                      router.push(`/staking/pools/${pool.StakingPoolID}`)
                    }
                  >
                    View Pool
                  </Button>
                </Flex>
              </Fragment>
            ))}
        </Box> */}
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
