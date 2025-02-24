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

    if (decodedToken.role === role && !isTokenExpired()) {
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