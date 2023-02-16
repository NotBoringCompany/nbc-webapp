import { createStyles, Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    warningIcon: {
        marginRight: '15px',
    }
}));

const NewInfo = () => {
    const { classes } = useStyles();
    return (
        <>
            <Flex
                direction='row'
                align='center'
                justify='center'
                style={{marginTop: 15}}
            >
                <IconAlertOctagon color='#42ca9f' size={30} className={classes.warningIcon}/>
                <Text sx={(theme) => ({
                    color: '#42ca9f',
                    fontSize: '20px',
                    [theme.fn.smallerThan('sm')]: {
                        fontSize: '14px'
                    }
                })}><b>For new Hunters</b>
                </Text>
            </Flex>
            <Text sx={(theme) => ({
                marginTop: '10px',
                fontSize: '16px',
                [theme.fn.smallerThan('sm')]: {
                    fontSize: '12px'
                }
            })}>
                New Hunters are required to complete <Text span c='#42ca9f'>all</Text> steps. 
            </Text>
        </>
    );
}

export default NewInfo;