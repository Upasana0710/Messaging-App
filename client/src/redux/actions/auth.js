import {AUTH} from "../const/actionTypes";
import * as api from "../../api/index";

export const signupGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        // signup user
        const {data} = await api.signup(accessToken)

        dispatch({type : AUTH, data})
        navigate("/messaging")
    }catch(err){
        console.log(err);
    }
}

export const signinGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        // login user
        const {data} = await api.signin(accessToken)
        dispatch({type : AUTH, data})
        navigate("/messaging")
    }catch(err){
        console.log(err)
    }
}