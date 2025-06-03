import { useState, useEffect } from "react";

export function useToken() {
    const [token, setTokenState] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = (newToken: string) => {
        localStorage.setItem('token', newToken)
        setTokenState(newToken);
    }

    return [token, setToken];
}