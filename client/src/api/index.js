import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info").token)}`
    }
    return req;
})

export const signup = (accessToken) => API.post("/user/signup", {googleAccessToken: accessToken})
export const signin = (accessToken) => API.post("/user/signin", {googleAccessToken: accessToken})
