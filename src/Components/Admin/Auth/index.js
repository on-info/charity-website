import { server } from "../../../api";

const setToken = data => {
    sessionStorage.setItem('token', data.token);
};

const getToken = () => window.sessionStorage.getItem('token');

const removeToken = () => window.sessionStorage.removeItem('token');

console.log(process.env.NODE_ENV)

const signInUser = credentials => {
    return fetch(`${ server }/auth`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        /* credentials: 'cors', */
        body: JSON.stringify(credentials),
    });
};
export { signInUser, setToken, getToken, removeToken };