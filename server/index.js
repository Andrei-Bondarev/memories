import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRouter from './Routes/posts.js'
import userRouter from './Routes/user.js'
import dotenv from "dotenv";
import mongoSanitize from 'express-mongo-sanitize'
const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(mongoSanitize({
    onSanitize: ({ req, key }) => {
        console.log(`This request[${key}] is sanitized`, req);
    },
}));

app.use('/posts', postRouter);
app.use('/user', userRouter);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(()=>{app.listen(PORT,() => console.log('works'))})

