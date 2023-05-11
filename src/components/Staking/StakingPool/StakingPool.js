import { Box, Divider, Flex, Text } from '@mantine/core'
import Image from 'next/image'
import RECToken from '../../../../public/recToken.png'
import { Fragment } from 'react'
import StakingPoolData from './PoolData'

const StakingPool = ({
    isActive,
    isClosed,
    stakeablePools,
    ongoingPools,
    closedPools,
}) => {
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
            <Text sx={{ marginTop: 25, marginBottom: 5 }} size={24} weight={600}>{isActive ? 'ACTIVE STAKING POOLS' : 'CLOSED STAKING POOLS'}</Text>
            <Divider
                color={isActive ? '#42ca9f' : 'grey'}
                style={{
                    width: '20%',
                    margin: '0 auto',
                }}
            />
            {isActive && !stakeablePools && !ongoingPools && (
                <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
                    There are currently no active staking pools to stake in.
                </Text>
            )}
            {isActive && stakeablePools && stakeablePools.map((pool) => (
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
                  <StakingPoolData pool={pool} active />
                </Flex>
              </Fragment>
            ))}
            {isActive && ongoingPools && ongoingPools.map((pool) => (
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
                  <StakingPoolData pool={pool} ongoing />
                </Flex>
              </Fragment>
            ))}
            {isClosed && !closedPools && (
                <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
                    There are currently no closed staking pools.
                </Text>
            )}
            {isClosed && closedPools && closedPools.map((pool) => (
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
                  <StakingPoolData pool={pool} closed />
                </Flex>
              </Fragment>
            ))}
        </Box>
    )
}

export default StakingPool