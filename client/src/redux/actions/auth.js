import {AUTH} from "../const/actionTypes";
import * as api from "../../api/index";

export const googleLogin = (accessToken, navigate) => async (dispatch)=>{
    try{
        // signup user
        const {data} = await api.googleLogin(accessToken)

        dispatch({type : AUTH, data})
        navigate("/messaging")
    }catch(err){
        console.log(err);
    }
}
