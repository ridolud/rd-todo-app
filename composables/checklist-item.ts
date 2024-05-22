export const useCheckListItems = () => {
    const config = useRuntimeConfig()
    const toast = useToast()
    const { token } = useToken()

    const store = useCheckListStore()
    const pending = ref(false)

    const getChecklistItems = (checklistId: number) => {
        pending.value = true
        $fetch<{data: ChecklistItem []}>(`${config.public.apiUrl}/checklist/${checklistId}/item`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then((data) => store.checklistItems = data.data)
        .finally(() => pending.value = false)
    }

    const createChecklistItem = async (checklistId: number, name: string) => {
        const data = await $fetch<{data: ChecklistItem}>(`${config.public.apiUrl}/checklist/${checklistId}/item`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: { itemName: name }
        })
        if(data.data) {
            toast.add({title: 'Checklist item berhasil dibuat'})
            store.checklistItems.push(data.data)
        }
    }

    const renameChecklistItem = async (checklistId: number, id: number, name: string) => {
        const data = await $fetch<{data: ChecklistItem}>(`${config.public.apiUrl}/checklist/${checklistId}/item/rename/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: { itemName: name }
        })
        if(data.data) {
            toast.add({title: 'Checklist item berhasil dibuat'})
            const itemIndex = store.checklistItems.findIndex((item) => item.id == id)
            store.checklistItems[itemIndex].name = name
        }
    }

    const deleteChecklistItem = async (checklistId: number, id: number) => {
        const data = await $fetch(`${config.public.apiUrl}/checklist/${checklistId}/item/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
        })
        if(data) {
            store.checklistItems.splice(store.checklistItems.findIndex((item) => item.id == id), 1);
            toast.add({title: 'Checklist berhasil dihapus'})
        }
    }

    const setCompletionStatus = async (checklistId: number, id: number, status: boolean = false) => {
        const data = await $fetch(`${config.public.apiUrl}/checklist/${checklistId}/item/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
        })
        if(data) {
            toast.add({title: 'Status Checklist berhasil diubah'})
        }
    } 

    return { checklistItems: computed(() => store.checklistItems), pending, getChecklistItems, renameChecklistItem, setCompletionStatus, createChecklistItem, deleteChecklistItem }
}