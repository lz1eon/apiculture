export function isLoggedIn() {
    const login = localStorage.getItem('orange_login');
    return !!login;
}