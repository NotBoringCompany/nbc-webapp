import { Badge, Button, Flex, Text } from '@mantine/core'
import { useRouter } from 'next/router'

const PoolComponent = ({
    title,
    text,
    badgeContent,
    badgeColor,
    badgeBgColor,
}) => {
    return (
        <Flex direction='column' align='center'>
            <Text
                size={18}
                weight={700}
                sx={{
                    marginRight: 20,
                    marginLeft: 20,
                }}
            >
                {title}
            </Text>
            {text && <Text>{text}</Text>}
            {badgeContent && (
                <Badge c={badgeColor} sx={(theme) => ({
                    backgroundColor: badgeBgColor,
                })}>{badgeContent}</Badge>
            )}
        </Flex>
    )
}

const StakingPoolData = ({ pool, active, ongoing, closed }) => {
    const router = useRouter();
    return (
        <>
            <PoolComponent 
                title='Staking Pool ID'
                text={pool.StakingPoolID}
            />
            <PoolComponent 
                title='Entry Until'
                text={
                    new Date(pool.StartTime)
                    .toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                    })
                    .replace(/24/, '00')
                }
            />
            <PoolComponent 
                title='Ends At'
                text={
                    new Date(pool.EndTime)
                    .toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                    })
                    .replace(/24/, '00')
                }
            />
            <PoolComponent 
                title='Total Reward'
                text={pool.Reward?.Amount}
            />
            <PoolComponent 
                title='Status'
                badgeContent={active ? 'STAKEABLE' : ongoing ? 'ONGOING' : closed ? 'CLOSED' : ''}
                badgeColor={active || ongoing ? 'white' : ''}
                badgeBgColor={active ? '#42ca9f' : ongoing ? '#ca4242' : closed ? '#grey' : ''}
            />
            <PoolComponent 
                title='Total Subpool Points'
                text={pool.TotalYieldPoints}
            />
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
        </>
    )
}

export default StakingPoolData