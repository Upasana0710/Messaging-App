import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from '../server/routes/userRoutes.js';
import messageRoutes from '../server/routes/messageRoutes.js';
import conversationRoutes from '../server/routes/conversationRoutes.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT, ()=> {
        console.log(`Chat server is running on port ${PORT}`);
    }))
    .catch((err)=>console.log(err));

const corsConfig={
    credentials: true,
    origin: true,
};

app.use(helmet());
app.use(compression());
app.use(cors(corsConfig));
app.use(morgan('tiny'));
    
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/conversation',conversationRoutes);