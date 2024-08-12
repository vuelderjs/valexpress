import UsersProviders from "./providers/UsersProviders"
import { User } from "./providers/schemas/User.schema"

export default class Session {
    private static _instance: Session
    public static redirectWhenLoggedIn = '/'
    public static redirectWhenLoggedOut = '/login'

    private _session: User | null = null

    public get session(): User | null {
        return this._session
    }

    constuctor(){
        if(!Session._instance){
            Session._instance = this
        }
        
        return Session._instance
    }

    public static setRedirectWhenLoggedIn(path: string) {
        Session.redirectWhenLoggedIn = path
    }

    public static setRedirectWhenLoggedOut(path: string) {
        Session.redirectWhenLoggedOut = path
    }

    public async login(email: string, password: string) {
        const { data: { userLogin } } = await UsersProviders.userLogin(email, password)
        localStorage.setItem('token', userLogin)
    }

    public logout() {
        localStorage.removeItem('token')
        this._session = null
    }

    private _syncronizeSessionLoading = false
    
    get syncronizeSessionLoading() {
        return this._syncronizeSessionLoading    
    }
    public async syncrhronizeSession() {
        try {
            this._syncronizeSessionLoading = true
            const { data: { userGetSession } } = await UsersProviders.userGetSession()
            this._session = userGetSession
        } catch (error) {
            localStorage.removeItem('token')
            throw error
        } finally {
            this._syncronizeSessionLoading = false
        }
    }
}