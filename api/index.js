import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Definindo a opção strictQuery para evitar o aviso de depreciação
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO).then(() => { 
    console.log("Conectado ao MongoDB !")
}).catch((err) => {
    console.log(err);
});

const app = express();

app.listen(3000, () => { 
    console.log("O servidor está rodando na porta 3000");
});
