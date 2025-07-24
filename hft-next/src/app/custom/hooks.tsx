"use client"

import { useState, useEffect } from "react";

export function useToken(): Array<any> {
    const [token, setTokenState] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('token')
        } else {
            return undefined
        }
    });

    const setToken = (newToken: string): void => {
        window.localStorage.setItem('token', newToken)
        setTokenState(newToken);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTokenState(window.localStorage.getItem('token'))
        }
    }, [])
    return [token, setToken];
}

export function useUser() {
    const [token] = useToken();
    const [userInfo, setUserInfo] = useState(() => {
        if (token) return getPayloadFromToken(token.toString())
        else return null
    });

    const getPayloadFromToken = (toke: string) => {
        const encodedPayload = toke.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    useEffect(() => {
        if (!token) {
            setUserInfo(null);
        } else {
            setUserInfo(getPayloadFromToken(token.toString()))
        }
    }, [token]);

    return userInfo;
}