import { Flex } from '@mantine/core';

const WLCollectionBody = ({children}) => {
    return (
        <Flex
            justify='center'
            align='center'
            sx={(theme) => ({
                maxWidth: '80%',
                flexDirection: 'row',                        

                [theme.fn.smallerThan('md')]: {
                    marginTop: -20,
                    fontSize: '16px',
                    maxWidth: '90%',
                    flexDirection: 'column',
                }
            })}
        >
            {children}
        </Flex>
    );
}

export default WLCollectionBody;