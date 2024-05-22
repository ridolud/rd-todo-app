<template>
    <div v-if="!isLogged" class="w-full pt-8 text-center">
        <p>Kamu belum terdaftar</p>
        <div class="flex justify-center gap-x-4">
            <UButton to="/auth/login">Login</UButton>
        </div> 
    </div>
    <div v-if="isLogged" >
        <div class="flex gap-4 items-center mb-4">
            <h1 class="text-xl flex-1">CheckLists:</h1> 
            <ChecklistFormModal>
                <template #trigger="{onShowModal}">
                    <UButton @click="onShowModal">Add New</UButton> 
                </template>
            </ChecklistFormModal>
        </div>
        <div v-if="!pending" class="grid grid-cols-3 gap-4">
            <ChecklistCard  v-for="checklist in checklists" :checklist="checklist"/>
        </div>
        <div v-if="pending" class="grid grid-cols-4 gap-x-4">
            <USkeleton class="h-12 w-full"/>
            <USkeleton class="h-12 w-full"/>
            <USkeleton class="h-12 w-full"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const { isLogged } = useToken()

const { pending, checklists, getChecklists } = useCheckLists()

onMounted(() => getChecklists())
</script>