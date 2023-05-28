import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT, ()=> {
        console.log(`Chat server is running on port ${PORT}`);
    }))
    .catch((err)=>console.log(err));

    const corsConfig={
        credentials: "true",
        origin: "http://localhost:3000",
        optionSuccessStatus: "200",
    };

app.use(helmet());
app.use(compression());
app.use(cors(corsConfig));
    
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));