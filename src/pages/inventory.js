import BorderedBox from '@/components/BorderedBox/BorderedBox';
import Layout from '@/components/Layout/Layout';
import { Flex, Text, Avatar, Divider } from '@mantine/core';
import NBCLogo from '../../public/NBCLogo.png'
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';

const Inventory = () => {
    const { user } = useMoralis();
    const [email, setEmail] = useState(null);
    const getEmail = () => {
        if (user && user.attributes.email) {
            setEmail(user.attributes.email);
        }
    }

    useEffect(() => {
        getEmail();
    }, [user])

    return (
        <Layout
            withAuth
            pageTitle='Inventory'
        >
            <Flex
                direction='row'
                align='center'
                justify='space-evenly'
            >
                <BorderedBox
                    borderRadiusSize='xl'
                    minWidth='25%'
                    padding='sm'
                >
                    <Flex
                        direction='column'
                        align='center'
                        justify='space-evenly'
                        mt={10}
                    >
                        <Avatar radius='md' size='xl' sx={(theme) => ({
                        backgroundColor: '#42ca9f',
                    })}>
                        {user.attributes.email ? user.attributes.email[0].toUpperCase() : <NBCLogo />}
                    </Avatar>
                    <Flex
                        direction='column'
                        mt={20}
                        px={20}
                    >
                        <Text>{`${user?.attributes?.ethAddress.slice(0, 7)}...${user?.attributes.ethAddress.slice(-5)}`}</Text>
                        <Divider color='#42ca9f' size='xs' variant='dashed' />
                        <Text>{email ?? 'No email provided.'}</Text>
                    </Flex>
                    </Flex>
                </BorderedBox>
                <BorderedBox
                    borderRadiusSize='xl'
                    minWidth='50%'
                    padding='sm'
                    sx={{marginTop: 20}}
                >

                </BorderedBox>
            </Flex>
        </Layout>
    )
}

export default Inventory;