import axios from 'axios'; 
import { GetToken } from './getToken';

let MongoURL = process.env.REACT_APP_MONGO_URL || ""

const dbAxiosInstance = axios.create({baseURL:`${MongoURL}`})

dbAxiosInstance.interceptors.request.use(
    async(config) => {
        //Retrieve the token in the way that fits your authentication string
        const token = await GetToken(); 

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
