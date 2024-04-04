import dbAxiosInstance from "./dbAxiosInstance";

export const getUserData = async(userId:string) => {
    try{
        const response = await dbAxiosInstance.get(`/users/${userId}`); 
        return response.data; 
    }catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; 
    }
}

export const getFavoriteExercises = async(userId:string, ) => {
    try{
        const response = await dbAxiosInstance.get('/users/');
    }
}