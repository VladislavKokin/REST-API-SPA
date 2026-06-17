const initialState = {
    todos: [],
    isCreating: false,
    isLoading: false,
    isUpdating: false,
    currentEditingId: null,
    isDeleting: false,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TODOS_PENDING':
            return { ...state, isLoading: true }
        case 'TODOS_FULFILLED':
            return { ...state, todos: action.payload, isLoading: false }
        case 'ADD_TODO_PENDING':
            return { ...state, isCreating: true }
        case 'ADD_TODO_FULFILLED': 
            return { ...state, todos: [ action.payload, ...state.todos ], isCreating: false }
        case 'DELETE_TODO_PENDING':
            return { ...state, isDeleting: true }
        case 'DELETE_TODO_FULFILLED':
            return { ...state, todos: state.todos.filter(todo => {
                return todo.id !== action.payload.id
            }), isDeleting: false }
        case 'UPDATE_TODO_PENDING':
            return { ...state, isUpdating: true }
        case 'UPDATE_TODO_FULFILLED':
            return { ...state, todos: state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return action.payload
                } else return todo
            }), isUpdating: false
            }
        case 'SEARCH_TODO_PENDING':
            return { ...state, isLoading: true }
        case 'SEARCH_TODO_FULFILLED':
            return { ...state, todos: action.payload, isLoading: false }
        case 'SORT_AZ_TODO_PENDING':
            return { ...state, isLoading: true }
        case 'SORT_AZ_TODO_FULFILLED':
            return {
                ...state,
                todos: action.payload,
                isLoading: false
            }
        case 'RESET_RESET_REQUEST_PENDING':
            return { ...state, isLoading: true }
        case 'RESET_RESET_REQUEST_FULFILLED':
            return { ...state, todos: action.payload }
        case 'SET_TODOS':
            return { ...state, todos: action.payload }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.payload }
        case 'SET_IS_CREATING':
            return { ...state, isCreating: action.payload }
        case 'SET_IS_UPDATING':
            return { ...state, isUpdating: action.payload }
        case 'SET_CURRENT_EDITING_ID':
            return { ...state, currentEditingId: action.payload }
        case 'SET_IS_DELETING':
            return { ...state, isDeleting: action.payload }
        default:
            return state;
    }
}