export const actions = {
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
}