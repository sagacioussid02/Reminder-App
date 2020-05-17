class AuthenticationService {
    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let sessionKey = sessionStorage.getItem('authenticatedUser')
        //console.log("session key is "+sessionKey)
        if(sessionKey===null) return false
        return true
    }

    getLoggedInUsername() {
        let user =  sessionStorage.getItem('authenticatedUser')
        if(user===null) return ''
        return user
    }
}

export default new AuthenticationService()