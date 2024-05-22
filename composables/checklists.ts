import { useCheckListStore } from "~/stores/checklist"

export const useCheckLists = () => {
    const config = useRuntimeConfig()
    const toast = useToast()
    const { token } = useToken()

    const store = useCheckListStore()
    const pending = ref(false)
    
    const getChecklists = () => {
        pending.value = true
        $fetch<{data: Checklist []}>(`${config.public.apiUrl}/checklist`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then((data) => {
            store.$patch({
                checklists: data.data
            })
        })
        .finally(() => pending.value = false)
    }

    const createChecklist = async (name: string) => {
        const data = await $fetch<{data: Checklist}>(`${config.public.apiUrl}/checklist`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: { name }
        })
        if(data.data) {
            toast.add({title: 'Checklist berhasil dibuat'})
            store.checklists.push(data.data as Checklist)
        }
    }

    const deleteChecklist = async (id: number) => {
        const data = await $fetch(`${config.public.apiUrl}/checklist/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
        })
        if(data) {
            store.checklists.splice(store.checklists.findIndex((checklist) => checklist.id == id), 1);
            toast.add({title: 'Checklist berhasil dihapus'})
        }
    }

    return { checklists: computed(() => store.checklists), pending, getChecklists, createChecklist, deleteChecklist }
}