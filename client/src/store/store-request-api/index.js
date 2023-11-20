import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'https://geocraftmapsbackend.onrender.com',
})

export const createMap = (newMapName, ownerUsername, userEmail, mapType) => {
    return api.post(`/map/`, {
        // SPECIFY THE PAYLOAD
        name: newMapName,
        ownerName: ownerUsername,
        ownerEmail: userEmail,
        mapType: mapType,
        comments: [],
        published: false,
        publishedDate: null,
        likes: [],
        dislikes: [],
        views: 0,
    })
}
export const deleteMapById = (id) => api.delete(`/map/${id}`)
export const getMapById = (id) => api.get(`/map/${id}`)
export const getMapPairs = () => api.get(`/mapPairs/`)
export const updateMapById = (id, map) => {
    return api.put(`/map/${id}`, {
        // SPECIFY THE PAYLOAD
        map : map
    })
}
export const updateUserFeedback = (id, map) => {
    return api.put(`/maps/${id}`, {
        // SPECIFY THE PAYLOAD
        map : map
    })
}
export const getPublishedLists = () => api.get('/maps/')

const apis = {
    createMap,
    deleteMapById,
    getMapById,
    getMapPairs,
    updateMapById,
    updateUserFeedback,
    getPublishedLists,
}

export default apis