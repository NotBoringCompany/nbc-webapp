const { Flex, Text } = require('@mantine/core');

const WLCollectionWP = ({children}) => {
    return (
        <Flex
            gap='md'
            justify='center'
            align='center'
            direction='column'
            sx={(theme) => ({
                'h1': {
                    fontSize: '70px',
                },
                [theme.fn.smallerThan('sm')]: {
                    'h1': {
                        fontSize: '40px',
                    }
                }
            })}
        >
            {children}
        </Flex>
    )
}

export default WLCollectionWP;