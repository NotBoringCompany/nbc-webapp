import CheckTwitterStepButton from 'deprecated/components/WLCollection/Buttons/CheckTwitterStep';
import RetweetStepButton from '@/components/Buttons/RetweetStep';
import StepsBox from './StepsBox';

const { Flex, Text, Box } = require('@mantine/core');
const { IconCheck, IconMessage, IconMessage2, IconSend } = require('@tabler/icons');

const RetweetStep = () => {
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
                    <IconSend size={35} />
                    <Text
                        color={'white'}
                        sx={(theme) => ({
                            margin: '20px 0px 20px 25px',
                            fontSize: 20,
                            fontWeight: 500,

                            [theme.fn.smallerThan('sm')]: {
                                fontSize: 14,
                                margin: '20px 2px 20px 25px',
                            }
                        })}
                    >
                        Retweet <a>this post</a>
                    </Text>
                </Flex>
                <RetweetStepButton />
            </Flex>
        </StepsBox>
    );
}

export default RetweetStep;