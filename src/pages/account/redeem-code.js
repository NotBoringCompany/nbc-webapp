import AuthContext from '@/components/Auth/AuthContext'
import Layout from '@/components/Layout/Layout'
import { Box, Button, Flex, Loader, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertOctagon } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useMoralis } from 'react-moralis'


const RedeemCode = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const { user } = useMoralis();
    const { emailUser } = useContext(AuthContext);
    const router = useRouter();

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        try {
            const { code } = formData;
            const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/invite-codes/redeem-invite-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    inviteCode: code,
                    email: user?.get('email') || localStorage.get('email') || emailUser,
                    uniqueHash: user?.get('uniqueHash')
                 })
            });

            const { status, error, message, data } = await resp.json();
            if (status === 500) {
                setErrorMessage(error);
                setLoading(false);
            } else {
                setErrorMessage(null);
                setSuccessMessage(message);
                setLoading(false);

                setTimeout(() => {
                    router.reload();
                }, 2000);
            }
        } catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    }
    const form = useForm({
        initialValues: { code: '' },
        validate: {
            code: (value) => (value.length >= 10 ? null : 'Code must be at least 10 characters long')
        }
    })
    return (
        <Layout
            pageTitle='Redeem Code'
            description='Redeem your invite code'
            withAuth
        >
            <Flex
                direction='row'
                justify='center'
                w='100%'
            >
                <Box
                    sx={(theme) => ({
                        borderRadius: theme.radius.md,
                        border: '2px solid #42ca9f',
                        width: '70%',
                        height: '50%',
                        marginTop: 40,
                        textAlign: 'center',
                        [theme.fn.smallerThan('md')]: {
                            width: '100%',
                            marginTop: 20,
                        }
                    })}
                >
                    <Flex
                        direction='row'
                        align='center'
                        justify='center'
                    >
                        <IconAlertOctagon size={60} color='#42ca9f' />
                        <Text
                            size={60}
                            weight={600}
                            ml={20}
                            c='#42ca9f'
                            sx={(theme) => ({
                                [theme.fn.smallerThan('md')]: {
                                    fontSize: 26,
                                }
                            })}
                        >REDEEM CODE</Text>
                    </Flex>
                    <Text size={24}>If you have received an invite code, please redeem it here.</Text>
                    <form
                        onSubmit={form.onSubmit(handleFormSubmit)}
                    >
                        <Flex
                            w='100%'
                            direction='column'
                            justify='center'
                            align='center'
                            mt={50}
                        >
                            <TextInput
                                my='sm'
                                sx={(theme) => ({
                                    input: {
                                        maxWidth: '1000px',
                                        minWidth: '600px',
                                        width: '100%',
                                        marginTop: '4px',
                                        padding: '24px 16px',
                                        border: `${theme.colors.nbcGreen[0]} 2px solid`,
                                        borderRadius: '8px',
                                        ':focus': {
                                            border: '2px solid #42ca9f',
                                        },
                                    },
                                })}
                                label={<Text size={30}>Invite Code</Text>}
                                type='text'
                                placeholder='Insert your code here'
                                {...form.getInputProps('code')}
                            />
                            <Button
                                h='48px'
                                miw='200px'
                                disabled={loading}
                                type='submit'
                                mt='lg'
                                sx={{
                                    background: '#42ca9f',
                                    transitionDuration: '200ms',
                                    ':hover': {
                                        transform: 'scale(1.01) translate(1px, -3px)',
                                        backgroundColor: '#42ca9f',
                                    },
                                }}
                            >
                                {loading ? <Loader color='green' /> : <Text size='md'>Redeem code</Text>}
                            </Button>
                            {!!successMessage && (
                                <Text sx={{ color: '#42ca9f' }} mt='md'>
                                    {successMessage}
                                </Text>
                            )}
                            {!!errorMessage && (
                                <Text sx={{ color: '#ca4242' }} mt='md'>
                                    {errorMessage}
                                </Text>
                            )}
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Layout>
    )
}

export default RedeemCode