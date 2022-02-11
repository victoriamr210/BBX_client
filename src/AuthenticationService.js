import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
    constructor(){
        this.token = '';
    }

    executeBasicAuthenticationService(username, password) {
        let auth = this.createBasicAuthToken(username, password);
        return axios.post(`${API_URL}/basicauth`,
            { headers: { authorization: auth} })
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password,
        });
    }

    getToken(){
        return this.token;
    }

    createBasicAuthToken(username, password) {
        return 'Bearer ' + "user.token." + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        console.log("register");
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService();