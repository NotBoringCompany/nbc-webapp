import { Flex } from '@mantine/core'
import WLVerificationConnectWalletStep from './StepsComponents/ConnectWallet'

const WLVerificationSteps = ({children}) => {
    return (
        <Flex
            direction='column'
            sx={(theme) => ({
                width: '75%',
                marginTop: 30,
                [theme.fn.smallerThan('sm')]: {
                    minWidth: '100%',
                }
            })}
        >
            <Flex
                direction='column'
                align='center'
                justify='center'
            >
                <WLVerificationConnectWalletStep />
            </Flex>
        </Flex>
    )
}

export default WLVerificationSteps