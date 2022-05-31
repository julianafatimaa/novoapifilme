import 'dotenv/config'
import usuarioController from './controller/usuarioController.js';
import filmeController from './controller/filmeController.js';
import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());
server.use(usuarioController);
server.use(filmeController);

server.use('/storage/capafilmes', express.static('storage/capafilmes'));

server.listen(process.env.PORT, () => console.log(`API CONECTADO NA PORTA ${process.env.PORT}`));