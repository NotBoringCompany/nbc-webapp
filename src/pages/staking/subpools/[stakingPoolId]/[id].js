import { cardColumnsBreakpoints } from '@/components/Breakpoints/CardColumns';
import Layout from '@/components/Layout/Layout'
import NFTCard from '@/components/Staking/NFTCard';
import { Box, Button, Divider, Flex, HoverCard, List, Loader, Modal, SimpleGrid, Text } from '@mantine/core';
import { IconAlertOctagon, IconHomeQuestion, IconQuestionCircle, IconQuestionMark, IconZoomQuestion } from '@tabler/icons';
import { useRouter } from 'next/router'
import { useState } from 'react';
import MathJax from 'react-mathjax2'
import { useMoralis } from 'react-moralis';

const MySubpool = ({ subpoolData, subpoolTokenShare, stakingPoolData, backtrackSubpoolPoints }) => {
    const router = useRouter();
    const { stakingPoolId, id } = router.query;
    const subpoolDataExists = subpoolData !== null;
    const { user } = useMoralis();

    const now = new Date().getTime();
    const startTime = stakingPoolData.StartTime;

    const [showUnstakeModal, setShowUnstakeModal] = useState(false);
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [unstakeLoading, setUnstakeLoading] = useState(false);
    const [unstakeDone, setUnstakeDone] = useState(false);
    const [claimLoading, setClaimLoading] = useState(false);
    const [claimDone, setClaimDone] = useState(false);

    const handleUnstake = async () => {
        setUnstakeLoading(true);
        const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/unstake-from-subpool`, {
            method: 'POST',
            headers: {
                'session-token': user && user.get('sessionToken'),
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wallet: user && user.attributes.ethAddress,
                stakingPoolId: parseInt(stakingPoolId),
                subpoolId: parseInt(id),
            })
        });

        const res = await rawRes.json();
        console.log('session token: ', user && user.get('sessionToken'));
        console.log('unstake res ', res);

        setTimeout(() => {
            setUnstakeDone(true);
            setTimeout(() => {
                router.replace('/staking/my-subpools')
            }, 2000)
        }, 2000);
    }

    const handleClaimReward = async () => {
        setClaimLoading(true);
        const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/claim-reward`, {
            method: 'POST',
            headers: {
                'session-token': user && user.get('sessionToken'),
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wallet: user && user.attributes.ethAddress,
                stakingPoolId: parseInt(stakingPoolId),
                subpoolId: parseInt(id),
            })
        });

        const res = await rawRes.json();

        setTimeout(() => {
            setClaimDone(true);
            setTimeout(() => {
                router.replace('/staking/my-subpools')
            }, 2000)
        })
    }

    const handleClaimModal = () => {
        setShowClaimModal(!showClaimModal);
    }

    const handleUnstakeModal = () => {
        setShowUnstakeModal(!showUnstakeModal);
    }

    return (
        <Layout pageTitle={`Subpool #${id} - Staking pool #${stakingPoolId}`} withAuth>
            {!subpoolDataExists && (
                    <Flex direction='column' align='center' justify='center'>
                    <Box
                        sx={(theme) => ({
                            borderRadius: theme.radius.md,
                            minWidth: '50%',
                            border: '2px solid #ca4242',
                            padding: '20px',
                            textAlign: 'center',
                            marginTop: 15,
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
                                SUBPOOL PAGE NOT AVAILABLE
                            </Text>
                        </Flex>
                        <Text size='lg'>
                            This subpool might not exist or is not available.
                        </Text>
                    </Box>
                </Flex>
            )}
            {subpoolDataExists && (
                <>
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
                            Staking Pool {stakingPoolId} {'<>'} Subpool {id}
                        </Text>
                    </Flex>
                    <Flex
                        direction='row'
                        align='center'
                        justify='center'
                        my={25}
                    >
                        <Box
                            sx={(theme) => ({
                                border: '3px solid #42ca9f',
                                borderRadius: theme.radius.xl,
                                padding: 20,
                                minWidth: '30%',
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
                                <Text sx={(theme) => ({
                                    fontSize: 40,
                                    fontWeight: 700,
                                    color: '#42ca9f'
                                })}>
                                    SUBPOOL DATA
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
                                <Text c='#42ca9f' size={20} weight={600}>ENTERED: {new Date(subpoolData.enterTime * 1000).toLocaleString()}</Text>
                            </Flex>
                            <Flex
                                direction='row'
                                align='center'
                                justify='center'
                                sx={(theme) => ({
                                    marginBottom: 20,
                                })}
                            >
                                <Button
                                    sx={(theme) => ({
                                        backgroundColor: '#42ca9f',
                                        ':hover': {
                                            transform: 'scale(1.01) translate(1px, -3px)',
                                            transitionDuration: '200ms',
                                            backgroundColor: '#42ca9f',
                                        },
                                        marginLeft: 10,
                                    })}
                                    onClick={handleUnstakeModal}
                                    disabled={now > new Date(stakingPoolData.StartTime).getTime()}
                                >
                                    Unstake
                                </Button>
                                <Button
                                    sx={(theme) => ({
                                        backgroundColor: '#42ca9f',
                                        ':hover': {
                                            transform: 'scale(1.01) translate(1px, -3px)',
                                            transitionDuration: '200ms',
                                            backgroundColor: '#42ca9f',
                                        },
                                        marginLeft: 10,
                                    })}
                                    disabled={!subpoolData.rewardClaimable || subpoolData.rewardClaimed}
                                    onClick={handleClaimModal}
                                >
                                    {subpoolData.rewardClaimable ? subpoolData.rewardClaimed ? 'Reward Claimed' : 'Claim Reward' : 'Not Claimable'}
                                </Button>
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
                                    <Text size={20} weight={600}>SUBPOOL POINTS</Text>
                                    <HoverCard width={350} shadow='md'>
                                        <HoverCard.Target>
                                            <Button 
                                                sx={(theme) => ({
                                                    backgroundColor: '#000000',
                                                    ':hover': {
                                                        backgroundColor: '#000000',
                                                    }
                                                })}
                                                size='xs'
                                            >
                                                <IconQuestionCircle />
                                            </Button>
                                        </HoverCard.Target>
                                        <HoverCard.Dropdown>
                                            <Flex
                                                direction='column'
                                                align='center'
                                                justify='center'
                                            >
                                                <Text>Luck/Luck Boost Bonus: {backtrackSubpoolPoints.luckAndLuckBoostSum}</Text>
                                                <Text>Angel Multiplier: {backtrackSubpoolPoints.angelMultiplier}</Text>
                                                <Text>Key Combo Bonus: {backtrackSubpoolPoints.keyCombo}</Text>
                                                <Text>Keychain Combo Bonus: {backtrackSubpoolPoints.keychainCombo}</Text>
                                                <Text mt={20} mb={10} size={20} weight={600} underline>TOTAL SUBPOOL POINTS</Text>
                                                <MathJax.Context input='tex'>
                                                    <MathJax.Node inline>{`\\left(100\\ +\\ \\left(${backtrackSubpoolPoints.luckAndLuckBoostSum}\\right)^{${backtrackSubpoolPoints.angelMultiplier}}\\ +\\ ${backtrackSubpoolPoints.keyCombo}\\right)\\ \\cdot\\ ${backtrackSubpoolPoints.keychainCombo}`}</MathJax.Node>
                                                </MathJax.Context>
                                                <MathJax.Context input='tex'>
                                                    <MathJax.Node inline>{`=${backtrackSubpoolPoints.totalSubpoolPoints}`}</MathJax.Node>
                                                </MathJax.Context>
                                            </Flex>
                                        </HoverCard.Dropdown>
                                    </HoverCard>
                                </Flex>
                                <Flex style={{marginBottom: 10}}>
                                    <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                                </Flex>
                                <Text>{subpoolData.subpoolPoints} POINTS</Text>
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
                                    <Text size={20} weight={600}>SUBPOOL REWARD SHARE</Text>
                                </Flex>
                                <Flex style={{marginBottom: 10}}>
                                    <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                                </Flex>
                                <Text>{subpoolTokenShare} {stakingPoolData.Reward.Name}</Text>
                            </Flex>
                        </Box>
                        <Box
                            py={10}
                            px={10}
                            sx={(theme) => ({
                                border: '2px solid #ca4242',
                                marginTop: 10,
                                borderRadius: theme.radius.xl,
                                textAlign: 'center',
                                maxWidth: '50%',
                                marginLeft: 50,
                            })}
                        >
                            <Flex
                                gap='md'
                                direction='row'
                                align='center'
                                justify='center'
                                mb={10}
                            >
                                <IconAlertOctagon size={30} color='#ca4242' />
                                <Text size={26} weight={600} c='#ca4242'>PLEASE PAY ATTENTION TO THE FOLLOWING</Text>
                            </Flex>
                            <Text size={22}>STAKING POOL START TIME: {new Date(stakingPoolData.StartTime).toLocaleString()}</Text>
                            <Text size={22} mb={30}>STAKING POOL END TIME: {new Date(stakingPoolData.EndTime).toLocaleString()}</Text>
                            <Text size={16} mb={15}>1. You are only allowed to unstake before the aforementioned start time. <br /> To unstake, click the {"'Unstake'"} button under SUBPOOL DATA.</Text>
                            <Text size={16} mb={15}>2. If you sell ANY of your staked NFTs while the subpool is ongoing, your <Text span c='#ca4242'>subpool will be automatically banned</Text> and you will receive a <Text span c='#ca4242'>TEMPORARY BAN FROM STAKING.</Text></Text>
                            <Text size={16}>3. You can only claim the subpool{"'s"} reward IF:</Text>
                            <List
                                center
                                my={5}
                            >
                                <List.Item>The staking pool has ended</List.Item>
                                <List.Item>Your subpool isn{"'t"} banned</List.Item>
                                <List.Item>You have not unstaked</List.Item>
                            </List>
                        </Box>
                    </Flex>
                    <Box
                        sx={(theme) => ({
                            border: '3px solid #42ca9f',
                            marginTop: 80,
                            borderRadius: theme.radius.md,
                            // textAlign: 'center',
                            padding: 20,
                            minWidth: '30%',
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
                            <Text sx={(theme) => ({
                                fontSize: 40,
                                fontWeight: 700,
                                color: '#42ca9f'
                            })}>
                                NFTS STAKED
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
                            {!subpoolData && (
                                <Text>Loading</Text>
                            )}
                            {subpoolData && (
                                <>
                                    <SimpleGrid
                                        sx={(theme) => ({
                                            justifyItems: 'center',
                                            alignItems: 'center'
                                        })}
                                        breakpoints={cardColumnsBreakpoints}
                                    >
                                        {subpoolData.stakedKeys?.sort((a, b) => a.TokenID - b.TokenID).map(k => (
                                            <NFTCard 
                                                key={k.AnimationUrl}
                                                nft={k}
                                            />
                                        ))}
                                        {subpoolData.stakedKeychains?.sort((a, b) => a.TokenID - b.TokenID).map(keychain => (
                                            <NFTCard
                                                key={keychain.name}
                                                nft={keychain}
                                            />
                                        ))}
                                        {subpoolData.stakedSuperiorKeychain?.tokenID !== -1 && (
                                            <NFTCard
                                                key={subpoolData.stakedSuperiorKeychain?.name}
                                                nft={subpoolData.stakedSuperiorKeychain}
                                            />
                                        )}
                                    </SimpleGrid>
                                </>
                            )}
                        </Flex>
                    </Box>                
                </>
            )}
            <Modal
                opened={showClaimModal}
                centered
                onClose={() => setShowClaimModal(false)}
                title={<Text size={24}>{!claimDone ? 'Claim Reward' : 'Reward Claimed'}</Text>}
                withCloseButton={false}
            >
                {!claimDone && (
                    <>
                        <Flex
                            direction='row'
                        >
                            <IconAlertOctagon size={30} style={{marginRight: 10}} />
                            <Text size={16}>Claiming {subpoolTokenShare} {stakingPoolData.Reward.Name}. Proceed?</Text>
                        </Flex>
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                            mt={15}
                        >
                            <Button 
                                size='sm'
                                sx={(theme) => ({
                                    backgroundColor: '#42ca9f',
                                    minHeight: '40px',
                                    minWidth: '5vw',

                                    '&:hover': {
                                    transform: 'scale(1.01) translate(1px, -3px)',
                                    transitionDuration: '200ms',
                                    backgroundColor: '#42ca9f',
                                    },

                                    '&:active': {
                                    transform: 'translateY(2px)',
                                    },
                                })}
                                onClick={handleClaimReward}
                            >
                                {claimLoading ? (
                                    <Loader color='white' />
                                ) : (
                                    <Text>Confirm</Text>
                                )}
                            </Button>
                        </Flex>
                    </>
                )}
                {claimDone && (
                    <>
                        <Flex
                            direction='row'
                        >
                            <Text size={16}>Reward claimed successfully! Redirecting...</Text>
                        </Flex>   
                    </>
                )}
            </Modal>
            <Modal
                opened={showUnstakeModal}
                centered
                onClose={() => setShowUnstakeModal(false)}
                title={<Text size={24}>{!unstakeDone ? 'Confirm Unstake' : 'Unstake Successful'}</Text>}
                withCloseButton={false}
            >
                {!unstakeDone && (
                    <>
                        <Flex
                            direction='row'
                        >
                            <IconAlertOctagon size={30} color='#ca4242' style={{marginRight: 10}} />
                            <Text c='#ca4242' size={16}>WARNING: Unstaking will remove this subpool. Are you sure you want to continue?</Text>
                        </Flex>
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                            mt={15}
                        >
                            <Button 
                                size='sm'
                                sx={(theme) => ({
                                    backgroundColor: '#ca4242',
                                    minHeight: '40px',
                                    minWidth: '5vw',

                                    '&:hover': {
                                    transform: 'scale(1.01) translate(1px, -3px)',
                                    transitionDuration: '200ms',
                                    backgroundColor: '#ca4242',
                                    },

                                    '&:active': {
                                    transform: 'translateY(2px)',
                                    },
                                })}
                                onClick={handleUnstake}
                            >
                                {unstakeLoading ? (
                                    <Loader color='white' />
                                ) : (
                                    <Text>Confirm</Text>
                                )}
                            </Button>
                        </Flex>
                    </>
                )}
                {unstakeDone && (
                    <>
                        <Flex
                            direction='row'
                        >
                            <Text size={16}>Unstake successful! Redirecting...</Text>
                        </Flex>   
                    </>
                )}
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { stakingPoolId, id } = ctx.params;

    const subpoolDataRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/fetch-subpool-data/${stakingPoolId}/${id}`);
    const subpoolDataRes = await subpoolDataRawRes.json();
    const subpoolData = subpoolDataRes?.data?.subpoolData ?? null;

    const subpoolTokenShareRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/calculate-subpool-token-share/${stakingPoolId}/${id}`);
    const subpoolTokenShareRes = await subpoolTokenShareRawRes.json();
    const subpoolTokenShare = subpoolTokenShareRes?.data?.subpoolTokenShare ?? null;

    const stakingPoolDataRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/staking-pool-data/${stakingPoolId}`);
    const stakingPoolDataRes = await stakingPoolDataRawRes.json();
    const stakingPoolData = stakingPoolDataRes?.data?.stakingPoolData ?? null;

    const backtrackSubpoolPointsRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/backtrack-subpool-points/${stakingPoolId}/${id}`);
    const backtrackSubpoolPointsRes = await backtrackSubpoolPointsRawRes.json();
    const backtrackSubpoolPoints = backtrackSubpoolPointsRes?.data?.backtrackSubpoolPoints ?? null;

    return {
        props: {
            subpoolData,
            subpoolTokenShare,
            stakingPoolData,
            backtrackSubpoolPoints
        }
    }
}

export default MySubpool