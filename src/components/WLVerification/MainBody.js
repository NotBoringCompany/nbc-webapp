import { Flex } from '@mantine/core'

const WLVerificationMainBody = ({children}) => {
    return (
        <Flex
            gap='md'
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
    )
}

export default WLVerificationMainBody