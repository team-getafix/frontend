import { jwtDecode } from "jwt-decode";

export function isAdmin() {
    return isRole('admin');
}

export function isStudent() {
    return isRole('student');
}

export function isTeacher() {
    return isRole('teacher');
}

function isRole(role) {
    const decodedToken = decodeToken();

    if (decodedToken && decodedToken.role === role && isTokenValid() && typeof window !== 'undefined') {
        return true;
    }

    return false;
}

export function getId() {
    const decodedToken = decodeToken();
    if (decodedToken && isTokenValid() && typeof window !== 'undefined') {
        return decodedToken.id;
    }

    return null;
}

export function isTokenValid() {
    if (typeof window === 'undefined') {
        return;
    }
    
    return !isTokenEmpty() && !isTokenExpired();
}

export function isTokenExpired() {
    const decodedToken = decodeToken();
    const currentTime = Date.now() / 1000;

    return decodedToken && decodedToken.exp < currentTime;
}

function decodeToken() {
    if (!isTokenEmpty()) {
        const token = localStorage.getItem('token');
        return jwtDecode(token);
    }
}

function isTokenEmpty() {
    if (typeof localStorage === 'undefined' || !localStorage.getItem('token')) {
        return true;
    }
    return false;
}