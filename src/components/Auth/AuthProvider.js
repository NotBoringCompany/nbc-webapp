import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import AuthContext from './AuthContext';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { useMoralis } from 'react-moralis';
import handleAuth from '@/utils/moralisAuth';

const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [ isEmailAuthenticated, setIsEmailAuthenticated ] = useState(false);
    const [ emailUser, setEmailUser ] = useState(null);
    const [ emailLoginError, setEmailLoginError ] = useState(null);

    /** WEB3 STATES */
    const { enableWeb3, isAuthenticated, authenticate, Moralis } = useMoralis();
    const [ authError, setAuthError ] = useState(false);
    const [ isAuthenticating, setIsAuthenticating ] = useState(false);

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
                `https://nbc-webapp-api-ts-production.up.railway.app/webapp/check-wallet-exists/${emailUser ?? ''}`,
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
                    'metamask'
                );

                if (!isAuthenticating) {
                    router.replace('/');
                }
            }
        }

        checkAuth();
        checkWalletExists();
    }, [router]);


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

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('email');
        setIsEmailAuthenticated(false);
        setEmailUser(null);
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{ login, logout, isEmailAuthenticated, emailUser, setEmailUser, setEmailLoginError, emailLoginError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;