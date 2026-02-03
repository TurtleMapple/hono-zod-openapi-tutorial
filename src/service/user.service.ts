export interface User {
    id: number
    name: string
    email: string
    age: number
}

// Mock database
let users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
]
let nextId = 3

export const userService = {
    getAll: () => users,
    
    getById: (id: number) => users.find(u => u.id === id),
    
    create: (userData: Omit<User, 'id'>) => {
        const newUser = { id: nextId++, ...userData }
        users.push(newUser)
        return newUser
    },
    
    update: (id: number, userData: Partial<Omit<User, 'id'>>) => {
        const userIndex = users.findIndex(u => u.id === id)
        if (userIndex === -1) return null
        
        users[userIndex] = { ...users[userIndex], ...userData }
        return users[userIndex]
    },
    
    delete: (id: number) => {
        const userIndex = users.findIndex(u => u.id === id)
        if (userIndex === -1) return false
        
        users.splice(userIndex, 1)
        return true
    }
}
