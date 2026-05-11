export interface TodoItem {
    id: string
    name: string
    completed: boolean
    createdAt: Date
    updatedAt: Date | null
}
