import { Box, Flex, List, Text } from '@mantine/core'
import { IconAlertOctagon } from '@tabler/icons'

const SubpoolWarning = ({
    stakingPoolData
}) => {
    return (
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
                <Text size={26} weight={600} c='#ca4242'>
                    PLEASE PAY ATTENTION TO THE FOLLOWING
                </Text>
            </Flex>
            <Text size={22}>
                STAKING POOL START TIME:{' '}
                {new Date(stakingPoolData?.StartTime).toLocaleString()}
            </Text>
            <Text size={22} mb={30}>
                STAKING POOL END TIME:{' '}
                {new Date(stakingPoolData?.EndTime).toLocaleString()}
            </Text>
            <Text size={16} mb={15}>
                1. You are only allowed to unstake before the aforementioned
                start time. <br /> To unstake, click the {"'Unstake'"} button
                under SUBPOOL DATA.
            </Text>
            <Text size={16} mb={15}>
                2. If you sell ANY of your staked NFTs while the subpool is
                ongoing, your{' '}
                <Text span c='#ca4242'>
                    subpool will be automatically banned
                </Text>{' '}
                and you will receive a{' '}
                <Text span c='#ca4242'>
                    TEMPORARY BAN FROM STAKING.
                </Text>
            </Text>
            <Text size={16}>
                3. You can only claim the subpool{"'s"} reward IF:
            </Text>
            <List center my={5}>
                <List.Item>The staking pool has ended</List.Item>
                <List.Item>Your subpool isn{"'t"} banned</List.Item>
                <List.Item>You have not unstaked</List.Item>
            </List>
        </Box>
    )
}

export default SubpoolWarning