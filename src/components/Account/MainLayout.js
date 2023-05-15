const { Flex } = require('@mantine/core')
const { default: Layout } = require('../Layout/Layout')
const { default: AccountOverviewBox } = require('./OverviewBox')

const AccountMainLayout = ({email, ethAddress, children, pageTitle}) => {
    return (
        <Layout
            withAuth
            pageTitle={pageTitle}
        >
            <Flex
                direction='row'
                align='center'
                justify='space-evenly'
            >
                <AccountOverviewBox email={email} ethAddress={ethAddress} />
                {children}
            </Flex>
        </Layout>
    )
}

export default AccountMainLayout