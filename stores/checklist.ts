export const useCheckListStore = defineStore('checklist-store', {
    state: (): {
        checklists: Checklist [],
        checklistItems: ChecklistItem []
    } => ({
        checklistItems: [],
        checklists: []
    })
})