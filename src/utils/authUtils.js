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
    if (!isTokenEmpty()) {
        const token = localStorage.getItem('token');
        return jwtDecode(token);
    }
}

function isTokenEmpty() {

    if (!localStorage.getItem('token')) {
        return true;
    }
}