const { default: FollowTwitterStepButton, default: CheckTwitterStepButton } = require('@/components/Buttons/CheckTwitterStep');
const { Box, Flex, Anchor, Tooltip, Button, Badge, Text } = require('@mantine/core');
const { IconBrandTwitter, IconInfoSquareRounded, IconInfoCircle, IconInfoSquare } = require('@tabler/icons');

const CheckTwitterStep = () => {
    return (
        <Box
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '100%',
                textAlign: 'center',
                borderBottom: '2px solid #42ca9f',
                borderRight: '2px solid #42ca9f',
                borderTop: '2px solid #42ca9f',
                borderLeft: '2px solid #42ca9f',
                marginBottom: 15,
            })}
        >
            <Flex
                direction='row'
                align='center'
                justify='space-between'
                sx={(theme) => ({
                    marginLeft: 15,
                })}
            >
                <Flex
                    direction='row'
                    align='center'
                >
                    <IconBrandTwitter size={35}/>
                    <Text 
                        sx={(theme) => ({
                            margin: '20px 10px 20px 25px',
                            fontSize: 20,
                            fontWeight: 500,

                            [theme.fn.smallerThan('sm')]: {
                                fontSize: 14,
                                margin: '20px 5px 20px 5px',
                            }
                        })}
                    >
                        Follow <a href='https://twitter.com/realmhunterio' style={{color: '#42ca9f'}} target='_blank' rel='noreferrer'>Realm Hunter</a>, <a href='https://twitter.com/TheArchitectNBC' style={{color: '#42ca9f'}} target='_blank' rel='noreferrer'> Jason</a> 
                    </Text>
                    <Tooltip 
                        label='Once you follow both, click on the Verify button to confirm.'
                    >
                        <Badge
                            sx={(theme) => ({
                                backgroundColor: '#42ca9f',
                            })}
                        >
                            <p style={{color: 'white'}}>Info</p>
                        </Badge>
                    </Tooltip>
                </Flex>
                <CheckTwitterStepButton />
            </Flex>
        </Box>
    );
}

export default CheckTwitterStep;