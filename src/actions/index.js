import { requestMedia } from '../api'

let searchRequest

export const setQuery = query => ({
    type: 'SET_QUERY',
    query
})

export const setSearchData = data => ({
    type: 'SET_SEARCH_DATA',
    data
})

export const updateSearchData = () => (dispatch, getState) => {
    const {
        query,
        token } = getState()

    const mediaType = /^#.*/.test(query) ? 'tags' : 'users'

    dispatch({ type: 'SET_REQUEST_PROGRESS' })
    requestMedia(mediaType, query, token)
        .then(data => {
            dispatch({ type: 'UNSET_REQUEST_PROGRESS' })
            dispatch(setSearchData(data))
        })
}
