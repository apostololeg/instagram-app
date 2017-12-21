import { request } from '../utils'

let searchRequest

const ROOT = 'https://api.instagram.com/v1'

export const clientID = '4b33db17dcd047fc85c4790b83c52f8c'

export const redirectUrl = 'http://localhost:3000'

const getFullUrl = (path, token) => {
    const delimiter = /\?/.test(path) ? '&' : '?'

    return `${ROOT}${path}${delimiter}access_token=${token}`
}

const getEntityId = ({ name, id }, type) => type === 'users' ? id : name

export const requestMedia = (type, query, token) => {
    if (searchRequest) {
        searchRequest.cancel()
    }

    const searchText = encodeURIComponent(query.replace(/@|#/, ''))

    if (!searchText) {
        return new Promise(resolve => resolve([]))
    }

    const typeUrl = getFullUrl(`/${type}/search?q=${searchText}`, token)

    searchRequest = request(typeUrl)

    return searchRequest
        .then(({ data }) => {
            const item = Object(data.data)[0]

            if (!item) {
                return new Promise(resolve => resolve([]))
            }

            // TODO: multiitems search (limit ~= 3 items)
            const mediaID = getEntityId(item, type)
            const mediaUrl = getFullUrl(`/${type}/${mediaID}/media/recent`, token)

            return request(mediaUrl)
        })
        .then(({ data }) => Object(data).data || [])
}
