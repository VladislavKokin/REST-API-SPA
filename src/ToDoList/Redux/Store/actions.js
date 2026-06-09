export const actions = {
    setIsInput: (input) => {
        return {
            type: 'SET_IS_INPUT',
            payload: input
        }
    },
    setTodos: (todos) => {
        return {
            type: 'SET_TODOS',
            payload: todos
        }
    },
    setIsCreating: (creating) => {
        return {
            type: 'SET_IS_CREATING',
            payload: creating
        }
    },
    setIsToDoList: (toDoList) => {
        return {
            type: 'SET_IS_TO_DO_LIST',
            payload: toDoList
        }
    },
    setFilteredList: (filteredList) => {
        return {
            type: 'SET_FILTERED_LIST',
            payload: filteredList
        }
    },
    setIsLoading: (isLoading) => {
        return {
            type: 'SET_IS_LOADING',
            payload: isLoading
        }
    },
    setIsUpdating: (updating) => {
        return {
            type: 'SET_IS_UPDATING',
            payload: updating
        }
    },
    setCurrentEditingId: (currentEditingId) => {
        return {
            type: 'SET_CURRENT_EDITING_ID',
            payload: currentEditingId
        }
    },
    setEditedText: (editedText) => {
        return {
            type: 'SET_EDITED_TEXT',
            payload: editedText
        }
    },
    setIsDeleting: (deleting) => {
        return {
            type: 'SET_IS_DELETING',
            payload: deleting
        }
    },
    setSearchValue: (searchValue) => {
        return {
            type: 'SET_SEARCH_VALUE',
            payload: searchValue
        }
    }
}