import { jwtDecode } from "jwt-decode";

export function isAdmin() {
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    if (decodedToken.role === 'admin' && decodedToken.exp > currentTime) {
        return true;
    }

    return false;
}