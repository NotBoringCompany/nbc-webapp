import { Button } from '@mantine/core';
import { IconArrowRightRhombus } from '@tabler/icons';

const SubmitStepsButton = () => {
    return (
        <Button 
            sx={(theme) => ({
                backgroundColor: '#42ca9f',
                marginRight: 25,
                ':hover': {
                    transform: 'scale(1.01) translate(1px, -3px)',
                    transitionDuration: '200ms',
                    backgroundColor: '#42ca9f',
                },

                minWidth: '100%',
                minHeight: '55px',
                marginTop: 30,

                [theme.fn.smallerThan('sm')]: {
                    minHeight: '30px',
                    fontSize: 10,
                    marginTop: 10,
                }
            })}
            rightIcon={<IconArrowRightRhombus />}
        >
            Submit
        </Button>
    );
}

export default SubmitStepsButton;