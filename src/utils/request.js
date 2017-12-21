import axios, { CancelToken } from 'axios'

export const request = (url, params) => {
    let cancel
    let cancelRequested = false

    const opts = {
        cancelToken: new CancelToken(c => cancel = c),
        ...params
    }

    return Object.assign(axios.get(url, opts), { cancel })
}
