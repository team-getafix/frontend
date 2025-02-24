import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function isAdmin() {
    
    const decodedToken = decodeToken();

    if (decodedToken.role === 'admin' && !isTokenExpired()) {
        return true;
    }

    return false;
}

export function isTokenExpired() {
    const decodedToken = decodeToken();
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime
}

function decodeToken() {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
}