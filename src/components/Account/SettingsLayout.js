import { Divider, Flex, Text } from '@mantine/core'
import { HeadingFour } from '../Typography/Headings'
import AuthForm from '../Form/AuthForm'
import { useMoralis } from 'react-moralis';

const SettingsLayout = () => {
    const { user } = useMoralis();
    const userEthAddress = user?.attributes?.ethAddress;
    const userHasEmail = user && !!user.attributes.email;

    return (
        <Flex
            direction='column'
            justify='start'
            sx={(theme) => ({
                minWidth: '50%',
                maxWidth: '50%',
            })}
        >
            <HeadingFour mb={32}>Account Settings</HeadingFour>
            <Text
                weight='300'
                size='24px'
                mb='12px'
                sx={(theme) => ({
                    color: theme.colors.nbcGreen[0],
                })}
            >
                Details
            </Text>
            {!!user && (
                <Text
                    sx={(theme) => ({
                        span: {
                            color: theme.colors.nbcGreen[0],
                            fontWeight: 500,
                        },
                    })}
                >
                    Connected Wallet: <span>{userEthAddress}</span>
                </Text>
            )}
            {!!user && (
                <Text
                    sx={(theme) => ({
                        span: {
                            color: theme.colors.nbcGreen[0],
                            fontWeight: 500,
                        },
                    })}
                >
                    Connected Email:{' '}
                    {userHasEmail ? <span>{user.attributes.email}</span> : '-'}
                </Text>
            )}
            <Divider my='md' />
            <Text
                weight='300'
                size='24px'
                mb='12px'
                sx={(theme) => ({
                    color: theme.colors.nbcGreen[0],
                })}
            >
                Email & Password
            </Text>
            <AuthForm />
        </Flex>
    )
}

export default SettingsLayout