import { Flex, Text } from '@mantine/core'
import { IconAlertOctagon } from '@tabler/icons'

const WLVerificationVerifyWallet = () => {
    return (
        <>
            <Flex
                direction='row'
                align='center'
                justify='center'
                style={{ marginTop: 10 }}
            >
                <IconAlertOctagon color='#42ca9f' size={30} style={{ marginRight: 15 }}/>
                <Text
                    sx={(theme) => ({
                        color: '#42ca9f',
                        fontSize: 20,
                    })}
                >
                    <b>Verify to claim your whitelist</b>
                </Text>
            </Flex>
            <Text
                sx={(theme) => ({
                    marginTop: 10,
                    marginBottom: 10
                })}
            >
                If you are whitelisted, click the <Text span c='#42ca9f'>Submit Wallet</Text> button to confirm that you want to use this wallet to mint.
            </Text>
        </>
    )
}

export default WLVerificationVerifyWallet