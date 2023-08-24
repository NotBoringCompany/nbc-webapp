import { Button, Loader, Modal, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router'

const SignupModal = ({ isOpen = false, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [signedUp, setSignedUp] = useState(false);
    const [signupMsg, setSignupMsg] = useState(null);

    const router = useRouter();
    
    const resetStates = () => {
        setLoading(false);
        setErrorMsg(false);
    }

    const successMessage = (
        <Text sx={(theme) => ({ color: theme.colors.nbcGreen[0] })}>
            Successfully created your account! Refreshing...
        </Text>
    );

    const errorMessage = (
        <>
            <Text sx={(theme) => ({ color: theme.colors.nbcRed[0], marginBottom: 20 })}>
                    There has been a problem in creating your account. Issue: {errorMsg}
            </Text>
            <Button 
                sx={(theme) => ({
                    backgroundColor: '#42ca9f',
                    marginRight: 25,
                    ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                    },

                    [theme.fn.smallerThan('sm')]: {
                        fontSize: 10,
                    }
                })}
                onClick={() => window.location.reload()}
            >
                Retry
            </Button>
        </>
    )

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        try {
            const { email, password } = formData;
            const signupRawRes = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/register-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).catch((err) => console.log(err));

            const {status, message, error, data} = await signupRawRes.json();
            console.log(message);

            if (!error) {
                setSignedUp(true);
                setTimeout(() => {
                    router.replace('/');
                }, 2000);
            } else {
                setErrorMsg(message)
            }
        } catch (e) {
            console.error('Error while creating account', e);
        }
        setLoading(false);
    }

    const form = useForm({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 6 ? null : 'Password must have at least 6 characters'),
        }
    })

    const signupForm = (
        <>
            <Text>Please enter a valid email to create your account with.</Text>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <TextInput
                my='sm'
                sx={(theme) => ({
                    input: {
                    maxWidth: '400px',
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
                label='Email'
                type='email'
                placeholder='Email'
                {...form.getInputProps('email')}
            />
            <TextInput
                my='sm'
                sx={(theme) => ({
                    input: {
                    maxWidth: '400px',
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
                label='Password'
                type='password'
                placeholder='password'
                {...form.getInputProps('password')}
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
                {loading ? <Loader color='green' /> : <Text size='md'>Create your account</Text>}
            </Button>
            </form>
        </>
    );

    return (
        <Modal
            centered
            title={<Text size={24}>Signup</Text>}
            opened={isOpen}
            onClose={() => {
                onClose();
                resetStates();
            }}
            size={'md'}
        >
            {signedUp ? // if signedUp is true
                errorMsg ? // check if errorMsg is true
                    errorMessage : // if yes, display errorMessage component
                successMessage : // otherwise, return successMessage
            errorMsg ? // if signedUp is false, check if errorMsg is true
                errorMessage : // if true, then something went wrong with sign up (alternative of `signedUp -> errorMsg -> errorMessage)
                signupForm // if not, then user still is in signup form (most likely)
            }
        </Modal>
    );
};

export default SignupModal;