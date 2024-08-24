export function reducer(state, action) {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload } 
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] } 
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(item => item.id !== action.payload) } 
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(item =>
                    item.id === action.payload ? { ...item, isCompleted: !item.isCompleted } : item
                ),
            } 
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(item =>
                    item.id === action.payload.id ? { ...item, task: action.payload.newTask } : item
                ),
            } 
        default:
            return state 
    }
}
