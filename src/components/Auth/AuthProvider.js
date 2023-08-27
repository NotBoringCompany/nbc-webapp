import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import AuthContext from './AuthContext';
import { useRouter } from 'next/router';

const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [ isEmailAuthenticated, setIsEmailAuthenticated ] = useState(false);
    const [ emailUser, setEmailUser ] = useState(null);
    const [ emailLoginError, setEmailLoginError ] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('jwtToken');
            const email = localStorage.getItem('email');

            console.log('token: ', token);
            console.log('email: ', email);

            if (token) {
                setIsEmailAuthenticated(true);
                setEmailUser(email);
            } else {
                setIsEmailAuthenticated(false);
                setEmailUser(null);
            }
        };

        checkAuth();
    }, []);

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