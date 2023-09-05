import { Button, Flex, Loader, Modal, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router'
import { IconCircleCheck, IconCircleX } from '@tabler/icons';

const SignupModal = ({ isOpen = false, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [signedUp, setSignedUp] = useState(false);
    const [signupMsg, setSignupMsg] = useState(null);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
    });

    const passwordRequirementsMet = 
        passwordRequirements.length && 
        passwordRequirements.lowercase && 
        passwordRequirements.uppercase && 
        passwordRequirements.number && 
        passwordRequirements.special;

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

            const { status, message, error, data } = await signupRawRes.json();
            console.log(message);

            if (!error) {
                setSignedUp(true);
                setTimeout(() => {
                    router.replace('/signup/success');
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
            // this needs to be stronger.
            password: (value) => {
                if (value.length < 8) {
                    return 'Password must have at least 8 characters';
                }
                if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value)) {
                    return 'Password must include lowercase, uppercase, numbers, and special symbols';
                }
                // if (value.includes('commonword') || value.includes('useremail')) {
                //   return 'Avoid using common words or personal information';
                // }

                // TO DO: Check against common password databases
                // Implement this part using a relevant library or service
                // Example: if (isPasswordCompromised(value)) return 'Password has been compromised';
                return null;
            }
        }
    })

    useEffect(() => {
        const checkPasswordRequirements = async () => {
            const { password } = form.values;
            const meetsLength = password.length >= 8;
            const meetsLowercase = /[a-z]/.test(password);
            const meetsUppercase = /[A-Z]/.test(password);
            const meetsNumber = /[0-9]/.test(password);
            const meetsSpecial = /[!@#$%^&*]/.test(password);
            
            setPasswordRequirements({
                length: meetsLength,
                lowercase: meetsLowercase,
                uppercase: meetsUppercase,
                number: meetsNumber,
                special: meetsSpecial,
            })
        }

        checkPasswordRequirements();
    }, [form.values])

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
                <Text sx={(theme) => ({
                    marginTop: 10,
                })}>Password requirements:</Text>
                <Flex
                    align='center'
                >
                    {passwordRequirements.length ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />} 
                    <Text ml={10} color={passwordRequirements.length ? '#42ca9f' : '#ca4242'}>At least 8 characters</Text>
                </Flex>
                <Flex
                    align='center'
                >
                    {(passwordRequirements.lowercase && passwordRequirements.uppercase) ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />} 
                    <Text ml={10} color={(passwordRequirements.lowercase && passwordRequirements.uppercase) ? '#42ca9f' : '#ca4242'}>Includes lower and upper case characters</Text>
                </Flex>
                <Flex
                    align='center'
                >
                    {passwordRequirements.number ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />} 
                    <Text ml={10} color={passwordRequirements.number ? '#42ca9f' : '#ca4242'}>At least 1 number</Text>
                </Flex>
                <Flex
                    align='center'
                >
                    {passwordRequirements.special ? <IconCircleCheck color='#42ca9f' /> : <IconCircleX color='#ca4242' />} 
                    <Text ml={10} color={passwordRequirements.special ? '#42ca9f' : '#ca4242'}>At least 1 special character</Text>
                </Flex>
                <Button
                    h='48px'
                    miw='200px'
                    disabled={loading || !passwordRequirementsMet}
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