import { ADD_BOOKMARK, ADD_TAG, EDITING_BOOKMARK } from '../actions/types'

const initialState = {
    bookmarks: [],
    editingBookmark: {}
}

export default function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload]
            }
        case ADD_TAG:
            return {
                ...state,
                bookmarks: state.bookmarks.map((bookmark, i) => {
                    if (i === action.payload.index) {
                        return {
                            ...bookmark,
                            tags: action.payload.elements
                        }
                    }
                    return bookmark
                })
            }
        case EDITING_BOOKMARK:
            return {
                ...state,
                editingBookmark: action.payload
            }                 
        default:
            return state
    }
}