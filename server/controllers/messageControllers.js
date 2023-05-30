import mongoose from 'mongoose';
import Messages from '../models/Message.js';

export const createMessage = async (req, res) => {
    try{
        const message = req.body;

        const newMessage = new Messages({...message});
        
        const savedMessage = await newMessage.save();

        res.json(savedMessage);
    }catch(error){
        console.log(error);
        res.json(error);
    }
}

export const getMessages = async (req, res) => {
    const convId = req.params.id
    try{
        const messages = await Messages.find({
            conversationId: convId
        });
        const response={messages: messages};
        res.json(response);
    }catch(error){
        console.log(error);
        res.json(error);
    }
}

export const deleteMessages = async (req, res) => {
    const messageId = req.params.id;
    try{
        await Messages.findByIdAndRemove({
            _id: messageId,
        });
        res.json("Message deleted!")
    }catch(error){
        console.log(error);
        res.json(error);
    }
}