import React, { useState } from 'react';
import { createContext, useContext } from 'react'
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    // a user that logs in via email and password will have its state stored in this authProvider component.
    // when logging in via web3, we currently use moralis, so they handle it directly.
    // moralis already has 'isAuthenticated' and 'user', so we want to make sure we don't get confused.
    const [isEmailAuthenticated, setIsEmailAuthenticated] = useState(false);
    const [emailUser, setEmailUser] = useState(null);

    const login = (userData) => {
        setIsEmailAuthenticated(true);
        setEmailUser({...emailUser, ...userData});
    }

    const logout = () => {
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