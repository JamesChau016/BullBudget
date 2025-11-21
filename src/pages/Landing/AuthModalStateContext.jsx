import React, { createContext, useContext, useState } from 'react';

const AuthModalStateContext = createContext();

export const AuthModalStateProvider = ({ children }) => {
    const [AuthModalState, setAuthModalState] = useState('none');
    
    return (
        <AuthModalStateContext.Provider value={{ AuthModalState, setAuthModalState }}>
            {children}
        </AuthModalStateContext.Provider>
    );
};

export const useAuthModalState = () => {
    const context = useContext(AuthModalStateContext);
    if (!context) {
        throw new Error('useAuthModal must be used within AuthModalStateProvider');
    }
    return context;
};

export default AuthModalStateContext;