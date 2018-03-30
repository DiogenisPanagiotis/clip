import { ADD_BOOKMARK, ADD_TAG, EDITING_BOOKMARK } from './types'

const actions = {

    addLink: bookmark => ({
        type: ADD_BOOKMARK,
        payload: bookmark
    }),
    addTag: tag => ({
        type: ADD_TAG,
        payload: tag
    }),
    editingBookmark: bookmark => ({
        type: EDITING_BOOKMARK,
        payload: bookmark
    })
}

export default actions