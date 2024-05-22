export {}

declare global {

    interface Checklist {
        id: number,
        name: string,
        items: ChecklistItem [],
        checklistCompletionStatus: boolean
    }
    
    interface ChecklistItem {
        id: number,
        name: string,
        itemCompletionStatus: boolean
    }
}