"use client"
import React, {createContext, useState} from 'react';
export const loadingContext = createContext();
const LoadingProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    return (
        <loadingContext.Provider value={{loading, setLoading}}>{children}</loadingContext.Provider>
    )
}
export default LoadingProvider;