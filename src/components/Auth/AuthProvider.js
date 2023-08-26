import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react'
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    // a user that logs in via email and password will have its state stored in this authProvider component.
    // when logging in via web3, we currently use moralis, so they handle it directly.
    // moralis already has 'isAuthenticated' and 'user', so we want to make sure we don't get confused.
    const [isEmailAuthenticated, setIsEmailAuthenticated] = useState(false);
    const [emailUser, setEmailUser] = useState(null);

    useEffect(() => {
        const storedEmailUser = localStorage.getItem('emailUser');
        const storedIsEmailAuthenticated = localStorage.getItem('isEmailAuthenticated');

        if (storedEmailUser && storedIsEmailAuthenticated === 'true') {
            setEmailUser(storedEmailUser);
            setIsEmailAuthenticated(true);
        }
    }, [])

    const login = (email) => {
        localStorage.setItem('emailUser', email);
        localStorage.setItem('isEmailAuthenticated', 'true');
        setIsEmailAuthenticated(true);
        setEmailUser({...emailUser, email });
    }

    const logout = () => {
        localStorage.removeItem('emailUser');
        localStorage.removeItem('isEmailAuthenticated');
        setIsEmailAuthenticated(false);
        setEmailUser(null);
    }

    // const setEmailUserData = (userData) => {
    //     setEmailUser({...emailUser, ...userData });
    // }
    return (
        <AuthContext.Provider value={{ emailUser, isEmailAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;