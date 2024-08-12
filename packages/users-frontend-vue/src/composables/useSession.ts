import { reactive, ref } from 'vue';
import Session from '@valexpress/users-frontend-core/src/Session'
import { useRouter } from 'vue-router'

export const useSession = () => {
    const session = reactive<Session>(new Session())
    console.log('session: ', session)

    const router = useRouter()

    const token = localStorage.getItem('token')
    
    //Middleware encargado de verificar si hay una sessión activa
    if(token) 
        session.syncrhronizeSession().then(() => {
            if(router.currentRoute.value.path == Session.redirectWhenLoggedOut) {
                router.push(Session.redirectWhenLoggedIn)
            }
        }).catch(() => {
            logout()
        })
    else if(router.currentRoute.value.path != Session.redirectWhenLoggedOut) router.push(Session.redirectWhenLoggedOut)
    

    const loginIsLoading = ref(false)
    const loginIsError = ref<Error | null>(null)

    const login = async (email: string, password: string) => {
        try {
            loginIsLoading.value = true
            await session.login(email, password)
            await session.syncrhronizeSession()
            router.push(Session.redirectWhenLoggedIn)
        } catch (error) {
            loginIsError.value = error instanceof Error ? error : new Error('Error desconocido')
        } finally {
            loginIsLoading.value = false
        }
    }

    const logout = async () => {
        session.logout()
        router.push(Session.redirectWhenLoggedOut)
    }

    return { 
        session,
        login,
        logout,
        loginIsLoading,
        loginIsError
    }
}