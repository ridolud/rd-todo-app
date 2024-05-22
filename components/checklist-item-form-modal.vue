<template>
    <slot name="trigger" :onShowModal="() => isOpenModal = true"></slot>
    <UModal v-model="isOpenModal">
        <UForm :schema="schema" :state="model" class="space-y-4 p-4" @submit="onSubmit">
            <h2 class="font-medium">{{ checklistItem ? 'Rename' : 'Create New' }} CheckList Item</h2>
            <UFormGroup label="Name" name="name">
                <UInput v-model="model.name" />
            </UFormGroup>
            <div class="w-full flex justify-end gap-2">
                <UButton variant="ghost" @click="isOpenModal = false">Cancle</UButton>
                <UButton :loading="pending" type="submit">{{ checklistItem ? 'Rename' : 'Create' }}</UButton>
            </div>
        </UForm>
    </UModal>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{checklistId: number, checklistItem?: ChecklistItem}>()

const isOpenModal = ref(false)
const { renameChecklistItem, createChecklistItem } = useCheckListItems()
const pending = ref(false)

const schema = object({
    name: string().required('Required'),
})

const model = reactive({
    name: props?.checklistItem?.name
})

type Schema = InferType<typeof schema>

async function onSubmit (event: FormSubmitEvent<Schema>) {
    pending.value = true
    if(props.checklistItem?.id) {
        renameChecklistItem(props.checklistId, props.checklistItem.id, event.data.name)
        .finally(() => pending.value = false)
        .then(() => isOpenModal.value = false)
    } else {
        createChecklistItem(props.checklistId, event.data.name)
        .finally(() => pending.value = false)
        .then(() => isOpenModal.value = false)
    }
}

</script>