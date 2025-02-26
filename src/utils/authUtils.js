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

    if (decodedToken && decodedToken.role === role && isTokenValid()) {
        return true;
    }

    return false;
}

export function isTokenValid() {
    return !isTokenEmpty() && !isTokenExpired() 
}

export function isTokenExpired() {
    const decodedToken = decodeToken();
    const currentTime = Date.now() / 1000;

    return decodedToken && decodedToken.exp < currentTime
}

function decodeToken() {
    try {
        if (!isTokenEmpty()) {
            const token = localStorage.getItem('token');
            return jwtDecode(token);
        }
    } catch (error) {
        console.warn(error);
    }
}

function isTokenEmpty() {

    try {
        if (!localStorage.getItem('token')) {
            return true;
        }
    } catch (error) {
        console.warn(error);
    }
}