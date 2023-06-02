import axios from "axios"

const API = axios.create({baseURL:"https://chatzbee.onrender.com/"})

//auth api
export const googleLogin = (accessToken) => API.post("/user/googleLogin", {googleAccessToken: accessToken})
// export const signup = (accessToken) => API.post("/user/signup", {googleAccessToken: accessToken})
// export const signin = (accessToken) => API.post("/user/signin", {googleAccessToken: accessToken})

//user api
export const fetchUser = (id) => API.get(`/user/${id}`);
export const searchUsers = async (search) => await API.get(`/user/search?n=${search}`);


//Conversation api
export const createDM=(newDM)=>API.post('/conversation',newDM);
export const getDM=(id)=>API.get(`/conversation/${id}`);

//message api
export const createMessage=(message)=>API.post('/message',message);
export const getMessages=(id)=>API.get(`/message/${id}`);
