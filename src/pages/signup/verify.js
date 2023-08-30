import Layout from '@/components/Layout/Layout';
import { Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SignupVerification = () => {
    // will be disabled once verifyToken finishes executing
    const [verifying, setVerifying] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    // verified will turn true if email and token matches whats on the DB after the fetch request.
    const [verified, setVerified] = useState(false);

    const router = useRouter();
    // changedEmail = boolean, if user has changed email.
    const { email, token, changedEmail, prevEmail } = router.query;

    useEffect(() => {
            console.log('prev email: ', prevEmail)
            console.log('email: ', email)
            console.log('token: ', token)
            const verifyToken = async () => {
                const verify = (changedEmail === 'true' && !!prevEmail) ? await fetch(
                    `https://nbc-webapp-api-ts-production.up.railway.app/webapp/verify-token-email-change`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            newEmail: email,
                            token: token,
                            prevEmail: prevEmail,
                        })
                    }
                ) : await fetch(
                    `https://nbc-webapp-api-ts-production.up.railway.app/webapp/verify-token`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            token: token,
                        }),
                    }
                )

                const { status, error, message, data } = await verify.json();
                console.log(verify)

                if (error || status === 500) {
                    // for some reason, message here can be an object, thus the stringify method.
                    setErrorMsg(JSON.stringify(message));
                } else {
                    // just in case
                    setErrorMsg(null);
                    setVerified(true);
                }

                setVerifying(false);
            };
            // we require at least email and token to exist to proceed calling the function.
            if (verifying) {
                // wait 0.5 before calling verifyToken
                setTimeout(() => {
                    if (email && token) {
                        verifyToken();
                    }
                }, 500);
            } 
    }, [email, token, verifying]);

    return (
        <Layout
            pageTitle={errorMsg ? 'Invalid page' : 'Verification successful'}
            description={errorMsg ? 'Invalid page' : 'Verification successful'}
        >
            <Flex
                direction='column'
                align='center'
                sx={(theme) => ({
                    marginTop: 60,
                })}
                w='100%'
            >
                {verifying && (
                    <Flex
                        direction='row'
                        align='center'
                        justify='center'
                        w='50%'
                        sx={(theme) => ({
                            padding: '20px 20px 20px 20px',
                            borderRadius: theme.radius.md,
                            border: '2px solid gray',
                        })}
                    >
                        <IconAlertOctagon
                            size={50}
                            color='#42ca9f'
                            style={{ marginRight: 20 }}
                        />
                        <Text
                            sx={(theme) => ({
                                color: theme.colors.gray[0],
                                fontSize: '40px',
                                fontWeight: 800,
                                [theme.fn.smallerThan('md')]: {
                                    fontSize: '32px',
                                },
                            })}
                        >
                            Verifying...
                        </Text>
                    </Flex>
                )}

                {!verifying && verified && (
                    <>
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                            w='50%'
                            sx={(theme) => ({
                                padding: '20px 20px 20px 20px',
                                borderRadius: theme.radius.md,
                                border: '2px solid #42ca9f',
                            })}
                        >
                            <IconAlertOctagon
                                size={50}
                                color='#42ca9f'
                                style={{ marginRight: 20 }}
                            />
                            <Text
                                sx={(theme) => ({
                                    color: theme.colors.nbcGreen[0],
                                    fontSize: '40px',
                                    fontWeight: 800,
                                    [theme.fn.smallerThan('md')]: {
                                        fontSize: '32px',
                                    },
                                })}
                            >
                                Verification Successful!
                            </Text>
                        </Flex>
                        <Flex direction='row' align='center' justify='center' w='50%'>
                            <Text
                                sx={(theme) => ({
                                    fontSize: 20,
                                    marginTop: 30,
                                    [theme.fn.smallerThan('md')]: {
                                        fontSize: '14px',
                                    },
                                })}
                            >
                                You have successfully verified your email. <br />
                                <br />
                                You are now able to login to your account with your email
                                address.
                            </Text>
                        </Flex>
                    </>
                )}

                {!verifying && !verified && errorMsg && errorMsg.includes('already verified') && (
                    <Flex
                        direction='row'
                        align='center'
                        justify='center'
                        w='50%'
                        sx={(theme) => ({
                            padding: '20px 20px 20px 20px',
                            borderRadius: theme.radius.md,
                            border: '2px solid #ca4242',
                        })}
                    >
                        <IconAlertOctagon
                            size={50}
                            color='#ca4242'
                            style={{ marginRight: 20 }}
                        />
                        <Text
                            weight='600'
                            sx={(theme) => ({
                                fontSize: '32px',
                                color: '#ca4242',
                                [theme.fn.smallerThan('md')]: {
                                    fontSize: '24px',
                                },
                            })}
                        >
                            Email already verified.
                        </Text>
                    </Flex>
                )}

                {!verifying && !verified && errorMsg && !errorMsg.includes('already verified') && (
                    <Flex
                        direction='row'
                        align='center'
                        justify='center'
                        w='50%'
                        sx={(theme) => ({
                            padding: '20px 20px 20px 20px',
                            borderRadius: theme.radius.md,
                            border: '2px solid #ca4242',
                        })}
                    >
                        <IconAlertOctagon
                            size={50}
                            color='#ca4242'
                            style={{ marginRight: 20 }}
                        />
                        <Text
                            weight='600'
                            sx={(theme) => ({
                                fontSize: '32px',
                                color: '#ca4242',
                                [theme.fn.smallerThan('md')]: {
                                    fontSize: '24px',
                                },
                            })}
                        >
                            Token is either invalid or expired.
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Layout>
    );
};

export default SignupVerification;
