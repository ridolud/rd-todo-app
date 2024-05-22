export const useToken = () => {
    const router = useRouter()
    const token = useLocalStorage('app-token', null)

    const isLogged = computed(() => !!token.value)

    const logout = () => {
        token.value = null
        router.replace('/auth/login')
    }

    return {token, isLogged, logout}
}