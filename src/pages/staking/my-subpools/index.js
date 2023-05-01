import Layout from '@/components/Layout/Layout'
import { Badge, Box, Button, Divider, Flex, Popover, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconAlertOctagon } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

const MySubpools = () => {
    const { user } = useMoralis();
    const [ stakerSubpools, setStakerSubpools ] = useState(null);

    const fetchStakerSubpools = async () => {
        const subpoolRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/get-staker-subpools/${user && user.attributes.ethAddress}`);
        const subpoolRes = await subpoolRawRes.json();

        setStakerSubpools(subpoolRes?.data?.stakerSubpools);
    }

    useEffect(() => {
        fetchStakerSubpools();
    }, [user, user?.attributes])

    return (
        <Layout withAuth>
            <Flex
                direction='column'
                align='center'
                justify='center'
            >
                <Text sx={(theme) => ({
                    fontSize: 72,
                    fontWeight: 700,
                    color: '#42ca9f'
                })}>
                    MY SUBPOOLS
                </Text>
                <Flex
                    gap='md'
                    px={10}
                    py={10}
                    align='center'
                >
                    <IconAlertOctagon size={30} />
                    <Text size={24}>All the subpools you{"'"}ve staked will be shown here.</Text>
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
                        ACTIVE SUBPOOLS
                    </Text>
                    <Flex justify='center'>
                        <Divider
                            color='#42ca9f'
                            style={{
                                width: '20%',
                                marginLeft: '40%',
                                marginRight: '40%',
                            }}
                        />
                    </Flex>
                    {!stakerSubpools && (
                        <Text size={20} style={{ marginTop: 30, marginBottom: 30 }}>
                            You don{"'"}t have any subpools yet. Go to the staking page and stake now.
                        </Text>
                    )}
                    {stakerSubpools?.length > 0 && stakerSubpools.map((pool, index) => (
                        <>
                            <Flex
                                direction='row'
                                align='center'
                                sx={(theme) => ({
                                    padding: '20px 20px',
                                })}
                            >
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
                                        Subpool ID
                                    </Text>
                                    <Text>{pool.SubpoolID}</Text>
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
                                        Enter Time
                                    </Text>
                                    <Text>{new Date(pool.EnterTime).toLocaleString()}</Text>
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
                                        Subpool Points
                                    </Text>
                                    <Text>{pool.SubpoolPoints}</Text>
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
                                        Keys Staked
                                    </Text>
                                    <Text>{pool.StakedKeys.length}</Text>
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
                                        Keychain Staked?
                                    </Text>
                                    <Text>{pool.StakedKeychainID !== -1 ? 'Yes' : 'No'}</Text>
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
                                        Superior Keychain Staked?
                                    </Text>
                                    <Text>{pool.StakedSuperiorKeychainID !== -1 ? 'Yes' : 'No'}</Text>
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
                                        Claim Reward
                                    </Text>
                                    {pool.RewardClaimable && (
                                        <Button
                                            sx={(theme) => ({
                                                backgroundColor: '#42ca9f',
                                                ':hover': {
                                                    transform: 'scale(1.01) translate(1px, -3px)',
                                                    transitionDuration: '200ms',
                                                    backgroundColor: '#42ca9f',
                                                },
                                            })}
                                            disabled={!pool.RewardClaimable}
                                        >
                                            Claim
                                        </Button>
                                    )}
                                    {!pool.RewardClaimable && (
                                        <Tooltip label='Subpool is still ongoing. Cannot claim yet.'>
                                            <Badge sx={(theme) => ({
                                                marginTop: 5,
                                                backgroundColor: '#ca4242',
                                                color: 'white',
                                                textAlign: 'center',
                                            })}>NOT AVAILABLE</Badge>
                                        </Tooltip>
                                    )}
                                </Flex>
                                <Flex direction='column' align='center'>
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
                                    >
                                        Visit Subpool
                                    </Button>
                                </Flex>
                            </Flex>
                            {index !== stakerSubpools.length - 1 && (
                                <Divider color='#42ca9f' />
                            )}
                        </>
                    ))}
                </Box>
            </Flex>
        </Layout>
    )
}

export default MySubpools