<template>
    <div class="flex items-center">
        <UCheckbox 
            size="md" 
            v-model="item.itemCompletionStatus" 
            class="flex-1"
            :disabled="pending"
            @change="onChange"
            >
            <template #label>
                <span :class="{'line-through': item.itemCompletionStatus}" >{{ item.name }}</span>
            </template>
        </UCheckbox>
        <ChecklistItemFormModal :checklist-id="checklistId" :checklist-item="item">
            <template #trigger="{onShowModal}">
                <UButton variant="link" @click="onShowModal">Rename</UButton> 
            </template>
        </ChecklistItemFormModal>
        <UButton :loding="pending" @click="onRemove" variant="link" class="text-red-500">Delete</UButton>
    </div>
    <UDivider></UDivider>
</template>

<script setup lang="ts">
const props = defineProps<{item: ChecklistItem, checklistId: number}>()

const pending = ref(false)
const {deleteChecklistItem, setCompletionStatus} = useCheckListItems()

const onRemove = () => {
    pending.value = true
    deleteChecklistItem(props.checklistId, props.item.id)
        .finally(() => pending.value = false)
}

const onChange = () => {
    pending.value = true
    setCompletionStatus(props.checklistId, props.item.id)
        .finally(() => pending.value = false)
}

</script>