import { useCallback, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

const { Flex } = require('@mantine/core')
const { default: Layout } = require('../Layout/Layout')
const { default: AccountOverviewBox } = require('./OverviewBox')

const AccountMainLayout = ({pageName, children, pageTitle, description}) => {
    const { user } = useMoralis();
    const [ email, setEmail] = useState(null);
    const getEmail = useCallback(() => {
        if (user?.attributes?.email) {
            setEmail(user.attributes.email);
        }
    }, [user])

    useEffect(() => {
        if (!email) {
            getEmail();
        }
    
    }, [email, getEmail])
    return (
        <Layout
            withAuth
            pageTitle={pageTitle}
            description={description}
        >
            <Flex
                direction='row'
                align='center'
                justify='space-evenly'
            >
                <AccountOverviewBox pageName={pageName ?? pageTitle} email={email} ethAddress={user?.attributes?.ethAddress} />
                {children}
            </Flex>
        </Layout>
    )
}

export default AccountMainLayout