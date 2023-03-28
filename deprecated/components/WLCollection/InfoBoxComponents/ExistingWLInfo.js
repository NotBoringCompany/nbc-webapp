const { Flex, Text, createStyles } = require('@mantine/core');
const { IconAlertOctagon } = require('@tabler/icons');

const useStyles = createStyles((theme) => ({
    warningIcon: {
        marginRight: '15px',
    }
}));

const ExistingWLInfo = () => {
    const { classes } = useStyles();
    return (
        <>
            <Flex
                direction='row'
                align='center'
                justify='center'
            >
                <IconAlertOctagon color='#42ca9f' size={30} className={classes.warningIcon} />
                <Text sx={(theme) => ({
                    color: '#42ca9f',
                    fontSize: '20px',
                    [theme.fn.smallerThan('sm')]: {
                        fontSize: '14px'
                    }
                })}>
                    <b>For Hunters with an existing whitelist spot</b>
                </Text>
            </Flex>
            <Text sx={(theme) => ({
                marginTop: '10px',
                fontSize: '16px',
                [theme.fn.smallerThan('sm')]: {
                    fontSize: '12px'
                }
            })}>
                Hunters who have won a whitelist spot from DTC or overallocated collabs (for OA, you were required to claim your spot within the allocated time period) are only required to <Text span c='#42ca9f'>verify their wallet. </Text>
                Following and retweeting are optional.
            </Text>
        </>
    );
}

export default ExistingWLInfo;