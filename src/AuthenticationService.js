import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_TOKEN = "token"

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
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        console.log("register");
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        localStorage.setItem(USER_TOKEN, token)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(USER_TOKEN);
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                    config.headers['Content-Type'] = 'application/json';
                    config.headers['Accept'] =  'application/json';
                }
                return config
            }
        )
    }
}

export default new AuthenticationService();