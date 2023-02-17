import { Button } from '@mantine/core';
import { IconArrowRightRhombus } from '@tabler/icons';

const CheckTwitterStepButton = () => {
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

                [theme.fn.smallerThan('sm')]: {
                    fontSize: 10,
                }
            })}
            rightIcon={<IconArrowRightRhombus />}
            onClick={() => handleAuth(
                setAuthError,
                setIsAuthenticating,
                enableWeb3,
                Moralis,
                authenticate,
                'metamask'
            )}
        >
            Verify
        </Button>
    );
}

export default CheckTwitterStepButton;