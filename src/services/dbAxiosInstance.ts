import axios from 'axios'; 
import {getToken} from './getToken'; 

let firebaseURL = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || ""

const dbAxiosInstance = axios.create({baseURL:`${firebaseURL}`})

dbAxiosInstance.interceptors.request.use(
    async(config) => {
        //Retrieve the token in the way that fits your authentication string
        const token = await getToken(); 

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config; 
    }, 
    (error => {
        return Promise.reject(error)
    })
 )

 export default dbAxiosInstance;