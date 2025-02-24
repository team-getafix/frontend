import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function isAdmin() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, [])
    
    if (token) {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        if (decodedToken.role === 'admin' && decodedToken.exp > currentTime) {
            return true;
        }
    }  

    return false;
}