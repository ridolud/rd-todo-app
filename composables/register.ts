import { object, string, type InferType } from 'yup'

export const useRegister = () => {
    const config = useRuntimeConfig()
    const toast = useToast()
    const router = useRouter()
    const pending = ref(false)
    const model = reactive({
        username: undefined,
        email: undefined,
        password: undefined,
    })

    const schema = object({
        username: string().required('Required'),
        email: string().email().required('Required'),
        password: string().required('Required')
    })

    const register = () => {
        pending.value = true

        $fetch(`${config.public.apiUrl}/register`, {
            method: 'POST',
            body: model,
        })
        .then((data: any) => {
            toast.add({title: "Berhasil"})
            router.replace('/auth/login') 
        })
        .catch((err) => {
            if(err?.response?._data?.message) {
                toast.add({title: err?.response?._data?.message, description: err?.response?._data?.errorMessage, color: 'amber'}) 
            } else {
                toast.add({title: "Connection Error", color: 'amber'}) 
            }
        })
        .finally(() => pending.value = false)
    }

    return {model, register, pending, schema}
}