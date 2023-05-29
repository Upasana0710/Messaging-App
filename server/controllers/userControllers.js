import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from 'config';
import User from '../models/User.js';

// export const googleSignup = async (req, res ) => {
//     try{
//         const {email} = req.body;

//         const userData = req.body;

//         //Checks whether user already exists
//         const existingUser = await user.findOne({email})

//         if(existingUser) return res.status(404).json({
//             message:"User already exists"
//         });

//         const  user = await user.create({email: email, name: req.body.name})


//         const token = jwt.sign({email: user.email, id: user.id},'test',{expiresIn: '1h'})

//         res.status(201).json({message:"User created succesfully",user: user,token})
//     }catch(error){
//         console.log(error);
//     }
// }

export const signup = (req, res) => {

    const {googleAccessToken} = req.body;

    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${googleAccessToken}`
        }
    }).then(async response =>{
        const name = response.data.given_name;
        const email = response.data.email;
        const profilePic = response.data.picture;

        const existingUser = await User.findOne({email})

        if (existingUser) 
            return res.status(400).json({message: "User already exist!"})

        const result = await User.create({verified:"true",name,email,profilePic})

        const token = jwt.sign({email: result.email,id: result._id}, config.get("JWT_SECRET"), {expiresIn: "1h"})
                
        res.status(200).json({result, token})
    }).catch(err => {
        console.log(err);

        res.status(400).json({message: "Invalid access token!"})
    })

}

export const signin = (req, res) => {
    const {googleAccessToken} = req.body;
        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        }).then(async response => {
            
            const name = response.data.given_name;
            const email = response.data.email;
            const profilePic = response.data.picture;

            const existingUser = await User.findOne({email})

            if (!existingUser) 
            return res.status(404).json({message: "User don't exist!"})

            const token = jwt.sign({email: existingUser.email,id: existingUser._id}, config.get("JWT_SECRET"), {expiresIn: "1h"})
    
            res.status(200).json({result: existingUser, token})
                
        }).catch(err => {
            console.log(err);

            res.status(400).json({message: "Invalid access token!"})
        })
}

export const getUser = async(req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error){
        console.log(error);
    }
}