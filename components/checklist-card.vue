<template>
    <UCard class="cursor-pointer">
        <template #header>
            <div class="flex gap-4">
                <p @click="() => $router.push(`/checklist/${checklist.id}?name=${checklist.name}`)" class="text-lg flex-1">{{ checklist.name }}</p>
                <p class="flex items-center text-sm text-green-500 gap-1"><span class="rounded-full h-2 w-2 bg-green-500 text-sm font-medium"></span> completed</p>
                <UButton :loding="pending" @click="onRemove" variant="link" class="text-red-500">Delete</UButton>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{checklist: Checklist}>()
const pending = ref(false)
const { deleteChecklist } = useCheckLists()

const onRemove = () => {
    pending.value = true
    deleteChecklist(props.checklist.id).finally(() => pending.value = false)
}

</script>