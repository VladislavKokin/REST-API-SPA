const initialState = {
    isInput: '',
    todos: [],
    isToDoList: [],
    filteredList: [],
    isCreating: false,
    isLoading: false,
    isUpdating: false,
    currentEditingId: null,
    editedText: '',
    isDeleting: false,
    searchValue: '',
}

export const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'SET_IS_INPUT':
            return { ...state, isInput: actions.payload }
        case 'SET_TODOS':
            return { ...state, todos: actions.payload }
        case 'SET_IS_TO_DO_LIST':
            return { ...state, isToDoList: actions.payload }
        case 'SET_FILTERED_LIST':
            return { ...state, filteredList: actions.payload }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: actions.payload }
        case 'SET_IS_CREATING':
            return { ...state, isCreating: actions.payload }
        case 'SET_IS_UPDATING':
            return { ...state, isUpdating: actions.payload }
        case 'SET_CURRENT_EDITING_ID':
            return { ...state, currentEditingId: actions.payload }
        case 'SET_EDITED_TEXT':
            return { ...state, editedText: actions.payload }
        case 'SET_IS_DELETING':
            return { ...state, isDeleting: actions.payload }
        case 'SET_SEARCH_VALUE':
            return { ...state, searchValue: actions.payload }
        default:
            return state;
    }
}