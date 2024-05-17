import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
dotenv.config();

// Definindo a opção strictQuery para evitar o aviso de depreciação
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO).then(() => { 
    console.log("Conectado ao MongoDB !")
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.use(cookieParser());


app.listen(3000, () => { 
    console.log("O servidor está rodando na porta 3000");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

