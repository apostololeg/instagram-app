const LS = window.localStorage

export const getFromLS = name => {
    const lsData = LS.getItem(name)

    if (!lsData) {
        return null
    }

    try {
        return JSON.parse(lsData)
    } catch (e) {
        console.warn('FAILED TO PARSE: localStorage')
        return lsData
    }
}

export const setToLS = (name, data) => {
    LS.setItem(name, JSON.stringify(data))
}

export const mergeToLS = (name, data) => {
    if (typeof data !== 'object') {
        return false
    }

    const prevData = Object(getFromLS(name))
    const mergedData = Object.assign(prevData, data)

    LS.setItem(name, JSON.stringify(mergedData))
}
