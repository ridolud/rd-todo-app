<template>
    <slot name="trigger" :onShowModal="() => isOpenModal = true"></slot>
    <UModal v-model="isOpenModal">
        <UForm :schema="schema" :state="model" class="space-y-4 p-4" @submit="onSubmit">
            <h2 class="font-medium">Create New CheckList</h2>
            <UFormGroup label="Name" name="name">
                <UInput v-model="model.name" />
            </UFormGroup>
            <div class="w-full flex justify-end gap-2">
                <UButton variant="ghost" @click="isOpenModal = false">Cancle</UButton>
                <UButton :loading="pending" type="submit">Create</UButton>
            </div>
        </UForm>
    </UModal>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const isOpenModal = ref(false)
const {createChecklist} = useCheckLists()
const pending = ref(false)

const schema = object({
    name: string().required('Required'),
})

const model = reactive({
    name: undefined
})

type Schema = InferType<typeof schema>

async function onSubmit (event: FormSubmitEvent<Schema>) {
    pending.value = true
    createChecklist(event.data.name)
    .finally(() => pending.value = false)
    .then(() => isOpenModal.value = false)
}

</script>