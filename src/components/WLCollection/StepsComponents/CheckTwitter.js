import CheckTwitterStepButton from '@/components/Buttons/CheckTwitterStep';
import StepsBox from './StepsBox';

const { Flex, Tooltip, Badge, Text } = require('@mantine/core');
const { IconBrandTwitter } = require('@tabler/icons');

const CheckTwitterStep = () => {
    return (
        <StepsBox>
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
                        color={'white'}
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
                        Follow <a href='https://twitter.com/realmhunterio' style={{color: '#ffffff'}} target='_blank' rel='noreferrer'>Realm Hunter</a>, <a href='https://twitter.com/TheArchitectNBC' style={{color: '#ffffff'}} target='_blank' rel='noreferrer'> Jason</a> 
                    </Text>
                    <Tooltip 
                        label='Once you follow the required users, click on the Verify button to confirm.'
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
        </StepsBox>
    );
}

export default CheckTwitterStep;