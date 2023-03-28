const { Flex, Text } = require('@mantine/core')
const { IconAlertOctagon } = require('@tabler/icons')

const WLVerificationCheckStatus = () => {
    return (
        <>
            <Flex
                direction='row'
                align='center'
                justify='center'
            >
                <IconAlertOctagon color='#42ca9f' size={30} style={{ marginRight: 15 }}/>
                <Text
                    sx={(theme) => ({
                        color: '#42ca9f',
                        fontSize: 20,
                    })}
                >
                    <b>Check your whitelist status</b>
                </Text>
            </Flex>
            <Text
                sx={(theme) => ({
                    marginTop: 10
                })}
            >
                Connect your wallet. If you are whitelisted, you will see either <Text span c='#42ca9f'>Guaranteed</Text> or <Text span c='#42ca9f'>Overallocated</Text> as your whitelist status.
            </Text>
        </>
    )
}

export default WLVerificationCheckStatus