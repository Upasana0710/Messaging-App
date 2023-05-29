import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000"})

//auth api
export const signup = (accessToken) => API.post("/user/signup", {googleAccessToken: accessToken})
export const signin = (accessToken) => API.post("/user/signin", {googleAccessToken: accessToken})

//user api
export const fetchUser = (id) => API.get(`/user/${id}`);

//Conversation api
export const getDM=(id)=>API.get(`/conversation/${id}`);

//message api
export const createMessage=(message)=>API.post('/message',message);
export const getMessages=(id)=>API.get(`/message/${id}`);
