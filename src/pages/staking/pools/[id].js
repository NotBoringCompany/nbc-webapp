import Layout from '@/components/Layout/Layout';
import { Box, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconMinusVertical } from '@tabler/icons';
import { useRouter } from 'next/router'

const StakingPool = ({stakingPoolData}) => {
    const router = useRouter();
    const { id } = router.query;

    const stakingPoolDataExists = stakingPoolData !== null;
    let activeSubpoolsLength;
    let closedSubpoolsLength;

    if (stakingPoolDataExists) {
        activeSubpoolsLength = stakingPoolData.ActiveSubpools !== null ? stakingPoolData.ActiveSubpools.length : 0
        closedSubpoolsLength = stakingPoolData.ClosedSubpools !== null ? stakingPoolData.ClosedSubpools.length : 0
    }

    const stakerCount = () => {
        const stakers = [];
        // filter through both active and closed subpools and add stakers to stakers array
        // if staker is already in stakers array, don't add them
        if (activeSubpoolsLength > 0) {
            stakingPoolData.ActiveSubpools.forEach((subpool) => {
                if (!stakers.includes(subpool.Staker)) {
                    stakers.push(subpool.Staker);
                }
            })
        }

        if (closedSubpoolsLength > 0) {
            stakingPoolData.ClosedSubpools.forEach((subpool) => {
                if (!stakers.includes(subpool.Staker)) {
                    stakers.push(subpool.Staker);
                }
            })
        }

        return stakers.length;
    }
    return (
        <Layout withAuth>
            {!stakingPoolDataExists && (
                <Flex direction='column' align='center' justify='center'>
                    <Box
                        sx={(theme) => ({
                            borderRadius: theme.radius.md,
                            width: '50%',
                            border: '2px solid #ca4242',
                            padding: '20px',
                            textAlign: 'center',
                            marginTop: 30,
                        })}
                    >
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                        >
                            <IconAlertOctagon color='#ca4242' size={40} style={{marginRight: 10}} />
                            <Text sx={(theme) => ({
                                fontSize: 40,
                                color: '#ca4242',
                                fontWeight: 700
                            })}>
                                STAKING PAGE NOT AVAILABLE
                            </Text>
                        </Flex>
                        <Text size='lg'>
                            This staking pool might not exist or is not available.
                        </Text>
                    </Box>
                </Flex>
            )}
            {stakingPoolDataExists && (
                <Flex
                direction='row'
                align='center'
                justify='center'
                >
                    <Box
                        sx={(theme) => ({
                            border: '3px solid #42ca9f',
                            marginTop: 80,
                            borderRadius: theme.radius.md,
                            // textAlign: 'center',
                            padding: 20,
                            width: '30%',
                            marginRight: 50,
                        })}
                    >
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            {/* <IconMinusVertical size={60} color='#42ca9f' /> */}
                            <Text sx={(theme) => ({
                                fontSize: 40,
                                fontWeight: 700,
                                color: '#42ca9f'
                            })}>
                                \ Staking Pool {id} {'/'}
                            </Text>
                        </Flex>
                        <Flex
                            direction='column'
                            align='center'
                            justify='center'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Text c='#42ca9f' size={20} weight={600}>ENTRY: {new Date(stakingPoolData.EntryAllowance).toLocaleString()}</Text>
                            <Text c='#42ca9f' size={20} weight={600}>STARTS: {new Date(stakingPoolData.StartTime).toLocaleString()}</Text>
                            <Text c='#42ca9f' size={20} weight={600}>ENDS: {new Date(stakingPoolData.EndTime).toLocaleString()}</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL POOL REWARD</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakingPoolData.Reward.Amount} {stakingPoolData.Reward.Name}</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL SUBPOOL POINTS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakingPoolData.TotalYieldPoints} points</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL SUBPOOLS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{activeSubpoolsLength + closedSubpoolsLength}</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL STAKERS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakerCount()}</Text>
                        </Flex>
                    </Box>
                    <Box
                        sx={(theme) => ({
                            border: '3px solid',
                            marginTop: 80,
                            borderRadius: theme.radius.xl,
                            textAlign: 'center',
                            width: '50%'
                        })}
                    >
                    </Box>
                </Flex>
            )}
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const stakingPoolDataRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/staking-pool-data/${id}`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    });
    const stakingPoolDataRes = await stakingPoolDataRawRes.json();

    // checks if staking pool data exists or not. if yes, check if `data.stakingPoolData` exists. if not, return null.
    const stakingPoolData = stakingPoolDataRes
        ? stakingPoolDataRes.data !== null
            ? stakingPoolDataRes.data.stakingPoolData != null
                ? stakingPoolDataRes.data.stakingPoolData
                : null
            : null
        : null;

    return {
        props: {
            stakingPoolData
        }
    }
}

export default StakingPool