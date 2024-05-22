export default defineNuxtRouteMiddleware((to, form) => {
    const { isLogged } = useToken()
    console.log(isLogged.value)
    if(!isLogged.value) { return navigateTo('/') }
}) 