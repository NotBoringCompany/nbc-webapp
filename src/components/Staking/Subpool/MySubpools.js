import { Badge, Flex, Text, Tooltip } from '@mantine/core'

export const MySubpoolText = ({ pool, title, text }) => {
    return (
        <Flex direction='column' align='center'>
            <Text
                size={18}
                weight={700}
                sx={{
                    marginLeft: 20,
                    marginRight: 20,
                }}
            >
                {title}
            </Text>
            <Text>{text}</Text>
        </Flex>
    )
}

export const MySubpoolTooltip = ({rewardClaimable, rewardClaimed }) => {
    return (
        <Flex direction='column' align='center'>
            <Text
                size={18}
                weight={700}
                sx={{
                    marginLeft: 20,
                    marginRight: 20,
                }}
            >
                Claimable?
            </Text>
            {!rewardClaimable && !rewardClaimed && (
                <Tooltip label='Subpool is still ongoing. Cannot claim yet.'>
                    <Badge
                        sx={(theme) => ({
                            marginTop: 5,
                            backgroundColor: '#ca4242',
                            color: 'white',
                            textAlign: 'center',
                        })}
                    >
                        NOT AVAILABLE
                    </Badge>
                </Tooltip>
            )}
            {rewardClaimable && !rewardClaimed && (
                <Tooltip label='Reward claimed.'>
                    <Badge
                        sx={(theme) => ({
                            marginTop: 5,
                            backgroundColor: 'grey',
                            color: 'white',
                            textAlign: 'center',
                        })}
                    >
                        CLAIMED
                    </Badge>
                </Tooltip>
            )}
            {rewardClaimed && (
                <Tooltip label='Reward claimed.'>
                    <Badge
                        sx={(theme) => ({
                            marginTop: 5,
                            backgroundColor: 'grey',
                            color: 'white',
                            textAlign: 'center',
                        })}
                    >
                        CLAIMED
                    </Badge>
                </Tooltip>
            )}
        </Flex>
    )
}
