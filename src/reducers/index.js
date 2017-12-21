import {
    getFromLS,
    setToLS } from '../utils'

const getToken = () => {
    const tokenFromLS = getFromLS('instagramToken')
    const hashToken = location.hash.replace(/^#access_token=/, '')

    if (tokenFromLS) {
        return tokenFromLS
    }

    if (hashToken) {
        location.hash = ''
        setToLS('instagramToken', hashToken) // remember user

        return hashToken
    }

    return null
}

const initialState = {
    query: '',
    token: getToken(),
    searchData: [],
    requestInProgress: false
}

export const token = (state = initialState.token) => state

export const query = (state = initialState.query, { type, query }) => {
    if (type === 'SET_QUERY') {
        return query
    }

    return state
}

export const searchData = (state = initialState.searchData, { type, data }) => {
    if (type === 'SET_SEARCH_DATA') {
        return data
    }

    return state
}

export const requestInProgress = (state = initialState.requestInProgress, { type, data }) => {
    if (type === 'SET_REQUEST_PROGRESS') {
        return true
    }

    if (type === 'UNSET_REQUEST_PROGRESS') {
        return false
    }

    return state
}
