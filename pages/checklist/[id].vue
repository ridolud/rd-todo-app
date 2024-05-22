<template>
    <UButton to="/" variant="outline">Back to Checklists</UButton>
    <div class="flex gap-4 items-center mb-4">
        <h1 class="text-xl flex-1 mt-4 mb-8">{{ $route.query['name'] ?? 'Checklist Items' }}</h1> 
        <ChecklistItemFormModal :checklist-id="checklistId">
            <template #trigger="{onShowModal}">
                <UButton @click="onShowModal">Add New</UButton> 
            </template>
        </ChecklistItemFormModal>
    </div>
    <div>
        <div v-if="!pending" class="grid grid-cols-1 gap-4">
            <ChecklistItem  v-for="item in checklistItems" :item="item" :checklist-id="checklistId"/>
        </div>
        <div v-if="pending" class="grid grid-cols-1 gap-4">
            <USkeleton class="h-8 w-full"/>
            <USkeleton class="h-8 w-full"/>
            <USkeleton class="h-8 w-full"/>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()

const {pending, getChecklistItems, checklistItems} = useCheckListItems()

const checklistId = computed(() => Number(route.params.id))

onMounted(() => {
    getChecklistItems(checklistId.value)
})
</script>