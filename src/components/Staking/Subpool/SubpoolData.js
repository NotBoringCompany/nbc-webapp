import { MediumButton } from '@/components/Buttons/Universals';
import { Box, Button, Divider, Flex, HoverCard, Text } from '@mantine/core'
import { IconAlertOctagon, IconQuestionCircle } from '@tabler/icons'
import MathJax from 'react-mathjax2'

const SubpoolData = ({
    subpoolData,
    stakingPoolData,
    userOwnsThisSubpool,
    backtrackSubpoolPoints,
    subpoolTokenShare,
    handleClaimModal,
    handleUnstakeModal,
}) => {
    const now = new Date().getTime();

    return (
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
                <Text
                    sx={(theme) => ({
                        fontSize: 40,
                        fontWeight: 700,
                        color: '#42ca9f',
                    })}
                >
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
                <Text c='#42ca9f' size={20} weight={600}>
                    ENTERED:{' '}
                    {new Date(subpoolData.enterTime * 1000).toLocaleString()}
                </Text>
            </Flex>
            <Flex
                direction='row'
                align='center'
                justify='center'
                sx={(theme) => ({
                    marginBottom: 20,
                })}
            >
                {userOwnsThisSubpool && (
                    <>
                        <MediumButton 
                            text='Unstake'
                            color='#42ca9f'
                            hoverColor='#42ca9f'
                            onClick={handleUnstakeModal}
                            disabled={
                                now > new Date(stakingPoolData.StartTime).getTime() ||
                                !user
                            }
                        />
                        <MediumButton 
                            text={subpoolData.rewardClaimable
                                ? subpoolData.rewardClaimed
                                    ? 'Reward Claimed'
                                    : 'Claim Reward'
                                : 'Not Claimable'
                            }
                            color='#42ca9f'
                            hoverColor='#42ca9f'
                            margin='0 0 0 10px'
                            onClick={handleClaimModal}
                            disabled={
                                !subpoolData.rewardClaimable ||
                                subpoolData.rewardClaimed
                            }
                        />
                    </>
                )}
            </Flex>
            <Flex
                direction='column'
                sx={(theme) => ({
                    marginBottom: 20,
                })}
            >
                <Flex direction='row' align='center'>
                    <IconAlertOctagon
                        color='#42ca9f'
                        style={{ marginRight: 10 }}
                    />
                    <Text size={20} weight={600}>
                        SUBPOOL POINTS
                    </Text>
                    <HoverCard width={350} shadow='md'>
                        <HoverCard.Target>
                            <Button
                                sx={() => ({
                                    backgroundColor: '#000000',
                                    ':hover': {
                                        backgroundColor: '#000000',
                                    },
                                })}
                                size='xs'
                            >
                                <IconQuestionCircle />
                            </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Flex direction='column' align='center' justify='center'>
                                <Text>
                                    Luck/Luck Boost Bonus:{' '}
                                    {backtrackSubpoolPoints.luckAndLuckBoostSum}
                                </Text>
                                <Text>
                                    Angel Multiplier:{' '}
                                    {backtrackSubpoolPoints.angelMultiplier}
                                </Text>
                                <Text>
                                    Key Combo Bonus: {backtrackSubpoolPoints.keyCombo}
                                </Text>
                                <Text>
                                    Keychain Combo Bonus:{' '}
                                    {backtrackSubpoolPoints.keychainCombo}
                                </Text>
                                <Text mt={20} mb={10} size={20} weight={600} underline>
                                    TOTAL SUBPOOL POINTS
                                </Text>
                                <MathJax.Context input='tex'>
                                    <MathJax.Node
                                        inline
                                    >{`\\left(100\\ +\\ \\left(${backtrackSubpoolPoints.luckAndLuckBoostSum}\\right)^{${backtrackSubpoolPoints.angelMultiplier}}\\ +\\ ${backtrackSubpoolPoints.keyCombo}\\right)\\ \\cdot\\ ${backtrackSubpoolPoints.keychainCombo}`}</MathJax.Node>
                                </MathJax.Context>
                                <MathJax.Context input='tex'>
                                    <MathJax.Node
                                        inline
                                    >{`=${backtrackSubpoolPoints.totalSubpoolPoints}`}</MathJax.Node>
                                </MathJax.Context>
                            </Flex>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
                <Flex style={{ marginBottom: 10 }}>
                    <Divider
                        color='#42ca9f'
                        style={{ width: '80%', marginRight: '10%' }}
                    />
                </Flex>
                <Text>{subpoolData.subpoolPoints} POINTS</Text>
            </Flex>
            <Flex
                direction='column'
                sx={(theme) => ({
                    marginBottom: 20,
                })}
            >
                <Flex direction='row' align='center'>
                    <IconAlertOctagon
                        color='#42ca9f'
                        style={{ marginRight: 10 }}
                    />
                    <Text size={20} weight={600}>
                        SUBPOOL REWARD SHARE
                    </Text>
                </Flex>
                <Flex style={{ marginBottom: 10 }}>
                    <Divider
                        color='#42ca9f'
                        style={{ width: '80%', marginRight: '10%' }}
                    />
                </Flex>
                <Text>
                    {subpoolTokenShare} {stakingPoolData.Reward.Name}
                </Text>
            </Flex>
        </Box>
    )
}

export default SubpoolData