const { Text } = require('@mantine/core');

const WLCollectionHeading = () => {
    return (
        <>
            <h1>Genesis Pass Access</h1>
            <Text sx={(theme) => ({
                    textAlign: 'center',
                    marginTop: -50,
                    width: '100%',
                    [theme.fn.smallerThan('sm')]: {
                        width: '85%',
                        marginTop: -30,
                    }
                })}>
                    Take part in our upcoming <Text span c='#42ca9f'><b>Genesis Pass Free Mint.</b></Text> Verify (or register by completing the steps for a chance) to win a whitelist spot.
            </Text>
        </>
    )
}

export default WLCollectionHeading;