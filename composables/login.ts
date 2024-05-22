import { object, string, type InferType } from 'yup'

export const useLogin = () => {
    const config = useRuntimeConfig()
    const toast = useToast()
    const router = useRouter()
    const {token} = useToken()
    const pending = ref(false)
    const model = reactive({
        username: undefined,
        password: undefined,
    })

    const schema = object({
        username: string().required('Required'),
        password: string().required('Required')
    })

    const login = () => {
        pending.value = true

        $fetch(`${config.public.apiUrl}/login`, {
            method: 'POST',
            body: model,
        })
        .then((data: any) => {
            if(data?.data?.token) {
                token.value = data.data.token
                toast.add({title: "Berhasil"})
                router.replace('/')
            }
        })
        .catch((err) => { toast.add({title: "Username or password invalid", color: 'amber'}) })
        .finally(() => pending.value = false)
    }

    return {model, login, pending, schema}
}