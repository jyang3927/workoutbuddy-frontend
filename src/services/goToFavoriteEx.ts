import dbAxiosInstance from "./dbAxiosInstance"

export const goToFavoriteEx = async() => {
    try {
        const response = await dbAxiosInstance.get('/users/favorites/exercises')
        return response.data
    }
    catch {

    }
}