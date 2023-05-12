import BorderedBox from '@/components/BorderedBox/BorderedBox';
import Layout from '@/components/Layout/Layout';
import { Flex, Text, Avatar, Divider, CopyButton, Tooltip, ActionIcon } from '@mantine/core';
import NBCLogo from '../../public/NBCLogo.png'
import { useMoralis } from 'react-moralis';
import { useCallback, useEffect, useState } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons';

const Inventory = () => {
    const { user } = useMoralis();
    const [email, setEmail] = useState(null);
    const getEmail = useCallback(() => {
        if (user?.attributes?.email) {
            setEmail(user.attributes.email);
        }
    }, [user])

    useEffect(() => {
        getEmail();
    }, [user, getEmail])

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
                    minWidth='20%'
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
                        {user?.attributes?.email[0]?.toUpperCase() ?? <NBCLogo />}
                    </Avatar>
                    <Flex
                        direction='column'
                        mt={20}
                        px={20}
                    >
                        <Flex
                            direction='row'
                            align='center'
                            justify='space-between'
                        >
                            <Text>
                                {`${user?.attributes?.ethAddress.slice(0, 7)}...${user?.attributes.ethAddress.slice(-5)}`}
                            </Text>
                            <CopyButton value={user?.attributes?.ethAddress} timeout={3000}>
                                {({copied, copy}) => (
                                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position='right'>
                                        <ActionIcon color={copied ? '#42ca9f' : 'white'} onClick={copy}>
                                            {copied ? <IconCheck color='#42ca9f' /> : <IconCopy color='#42ca9f' />}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Flex>
                        <Divider color='#42ca9f' size='xs' variant='dashed' />
                        <Text>{email ?? 'No email provided.'}</Text>
                    </Flex>
                    </Flex>
                </BorderedBox>
                <Flex
                    direction='column'
                    align='center'
                    justify='center'
                >
                    <Text>Hey</Text>
                    <Text>S</Text>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default Inventory;