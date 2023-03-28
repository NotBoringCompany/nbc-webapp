import ExistingWLInfo from './InfoBoxComponents/ExistingWLInfo';
import NewInfo from './InfoBoxComponents/NewInfo';

const { Box, Flex, Text, Divider, createStyles } = require('@mantine/core');
const { IconAlertOctagon } = require('@tabler/icons');

const useStyles = createStyles((theme) => ({}));

const WLCollectionInfoBox = () => {

    const { classes } = useStyles();
    return (
        <Box
            sx={(theme) => ({
                margin: '20px 30px 35px 0px',
                padding: '10px 20px',
                borderRadius: theme.radius.md,
                width: '50%',
                textAlign: 'center',
                borderBottom: '2px solid #42ca9f',
                borderRight: '2px solid #42ca9f',
                borderTop: '2px solid #42ca9f',
                borderLeft: '2px solid #42ca9f',

                [theme.fn.smallerThan('md')]: {
                    margin: '20px 0px 35px 0px',
                    width: '100%',
                }
            })}
        >
            <ExistingWLInfo />
            <Divider color='#42ca9f' size='xs' sx={{marginTop: 15}} variant='dashed' />
            <NewInfo />
        </Box>
    );
}

export default WLCollectionInfoBox;