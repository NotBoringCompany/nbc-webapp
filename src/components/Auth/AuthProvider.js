import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import AuthContext from './AuthContext';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { useMoralis } from 'react-moralis';
import handleAuth from '@/utils/moralisAuth';
import { Button, Modal, Text } from '@mantine/core';

const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [isEmailAuthenticated, setIsEmailAuthenticated] = useState(false);
    const [emailUser, setEmailUser] = useState(null);
    const [emailLoginError, setEmailLoginError] = useState(null);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showVerifyButton, setShowVerifyButton] = useState(false);
    const [showVerifyNewEmailModal, setShowVerifyNewEmailModal] = useState(false);
    const [sendingVerificationEmail, setSendingVerificationEmail] = useState(false);
    const [sentVerficationEmail, setSentVerificationEmail] = useState(false);
    const [sendVerifEmailError, setSendVerifEmailError] = useState(null);

    /** WEB3 STATES */
    const { enableWeb3, isAuthenticated, authenticate, Moralis, logout: moralisLogout, user } = useMoralis();
    const [authError, setAuthError] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);


    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('jwtToken');
            const email = localStorage.getItem('email');

            if (token) {
                const decodedToken = jwt_decode(token);

                const currentTime = Date.now() / 1000;
                // checks for token expiration
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('email');
                    setIsEmailAuthenticated(false);
                    setEmailUser(null);
                    router.replace('/');
                }
                setIsEmailAuthenticated(true);
                setEmailUser(email);
            } else {
                setIsEmailAuthenticated(false);
                setEmailUser(null);
            }
        };

        const checkWalletExists = async () => {
            const walletExists = await fetch(
                `https://nbc-webapp-api-ts-production.up.railway.app/webapp/check-wallet-exists/${user?.get('email') || localStorage.getItem('email') || emailUser}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            const { status, error, message, data } = await walletExists.json();

            if (data?.wallet && !isAuthenticated) {
                console.log('wallet exists')
                await handleAuth(
                    setAuthError,
                    setIsAuthenticating,
                    enableWeb3,
                    Moralis,
                    authenticate,
                    'metamask',
                    data.wallet
                );

                if (!isAuthenticating) {
                    router.replace('/');
                }
            }
        }

        // if a user logs in via wallet and they haven't verified their email, require them to verify.
        // when a user refreshes, we need to make sure that we don't send multiple emails.
        // thus, we check if !verified && !sentEmail, then the button to send verif email will pop up
        // otherwise, only show modal to verify.
        const requireVerificationLoggedIn = async () => {
            const hasEmail = localStorage.getItem('email') || user?.get('email');
            if (hasEmail) {
                const checkVerifStatus = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/check-verification-status/${user?.get('email') || localStorage.getItem('email') || emailUser}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const { status, error, message, data } = await checkVerifStatus.json();
                if (status === 200) {
                    // since we require the `uniqueHash` when requesting to get the verification email,
                    // we wait for `user` to exist. this should take a few seconds max once logged in.
                    if (user) {
                        console.log(user?.get('uniqueHash'))
                        // if theyre not verified and verif token hasn't been sent, we show both verify modal WITH button
                        if (!data?.hasVerificationToken && !data?.verified) {
                            setShowVerifyModal(true);
                            setShowVerifyButton(true);
                            // if theyre not verified and verif token has been sent, we show only verify modal
                        } else if (data?.hasVerificationToken && !data?.verified) {
                            setShowVerifyModal(true);
                            setShowVerifyButton(false);
                        }
                    }
                    // we dont check for any other cases.
                }
            }
        }

        // checks whether a user has recently changed their email and hasn't verified this email yet.
        // if yes, we send them a modal to verify their email.
        const checkNewEmailUnverified = async () => {
            const hasEmail = localStorage.getItem('email') || user?.get('email');
            if (hasEmail) {
                const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/check-new-email-unverified/${user?.get('email')}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const { status, error, message, data } = await resp.json();
                // we only care about the case where the user has changed their email and hasn't verified it yet.
                if (status === 200) {
                    if (!data?.verified) {
                        setShowVerifyNewEmailModal(true);
                    }
                }
            }
        }

        checkAuth();
        checkWalletExists();
        requireVerificationLoggedIn();
        checkNewEmailUnverified();
    }, [router, isAuthenticated, Moralis, enableWeb3, authenticate, isAuthenticating, emailUser, user]);

    const login = async (email, password) => {
        try {
            const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/email-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const { status, message, error, data } = await resp.json();

            if (status === 500) {
                setEmailLoginError(message);
            } else if (status === 200) {
                localStorage.setItem('jwtToken', data.token); // Store the token
                localStorage.setItem('email', data.email); // Store the email
                setIsEmailAuthenticated(true);
                setEmailUser(data.email);
                router.replace('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('email');
        setIsEmailAuthenticated(false);
        setEmailUser(null);
        if (isAuthenticated) {
            await moralisLogout();
        }

        router.replace('/');
    };

    const sendVerificationEmail = async () => {
        setSendingVerificationEmail(true);
        const resp = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/create-verification-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user?.get('email') || localStorage.getItem('email') || emailUser,
                uniqueHash: user?.get('uniqueHash')
            })
        });

        const { status, error, message, data } = await resp.json();

        if (status === 200) {
            setSendingVerificationEmail(false);
            setSentVerificationEmail(true);
            setShowVerifyButton(false);
        } else if (status === 500) {
            setSendingVerificationEmail(false);
            setSendVerifEmailError(message);
        }
    }

    const VerifyModal = () => {
        return (
            <Modal
                opened={showVerifyModal}
                centered
                onClose={() => setShowVerifyModal(false)}
                title={
                    <Text size={24}>Verify your email</Text>
                }
                withCloseButton={true}
            >
                {showVerifyModal && showVerifyButton && (
                    <>
                        {!sentVerficationEmail && !sendVerifEmailError && (
                            <>
                                <Text>Please verify your email address by clicking the button below. This will send a verification email to your inbox.</Text>
                                <Button
                                    loading={sendingVerificationEmail}
                                    onClick={() => sendVerificationEmail()}
                                    sx={(theme) => ({
                                        backgroundColor: '#42ca9f',
                                        marginTop: 20,
                                        ':hover': {
                                            transform: 'scale(1.01) translate(1px, -3px)',
                                            transitionDuration: '200ms',
                                            backgroundColor: '#42ca9f',
                                        },

                                        [theme.fn.smallerThan('sm')]: {
                                            marginTop: 10,
                                            fontSize: 10,
                                        }
                                    })}
                                >
                                    Send verification email
                                </Button>
                            </>
                        )}
                        {sendVerifEmailError && (
                            <>
                                <Text>There has been an error while sending the email. Reason: <br /><Text c='#ca4242'>{sendVerifEmailError}</Text></Text>
                            </>
                        )}
                        {sentVerficationEmail && (
                            <>
                                <Text>Verification email sent! Please check your inbox.</Text>
                            </>
                        )}
                    </>
                )}
                {showVerifyModal && !showVerifyButton && (
                    <>
                        <Text>A verification email has already been sent to your inbox. Please check your inbox and verify your email.</Text>
                    </>
                )}
            </Modal>
        )
    }

    return (
        <AuthContext.Provider value={{ login, logout, isEmailAuthenticated, emailUser, setEmailUser, setEmailLoginError, emailLoginError }}>
            <VerifyModal />
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;