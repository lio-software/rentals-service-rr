import express from "express";
import dotenv from 'dotenv';
import { Signale } from 'signale';
import morgan from 'morgan';
import syncConnection from "./database/mysql/connection";
import { } from '../tsconfig.json';
import cors from 'cors';
import busboy from 'connect-busboy';
import compression from "compression";
import { rentalRouter } from "./infrastructure/router/rental.router";

export const app = express();
const logger = new Signale();

dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
app.use(busboy());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
const PORT = process.env.PORT || 3002;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

app.options('*', cors())
app.use(cors())

app.use(`${API_PREFIX}/rentals`, rentalRouter)

async function startServer() {
    await syncConnection();
    app.listen(PORT, () => {
        logger.success(`Server running on http://0.0.0.0:${PORT}${API_PREFIX}`);
    });
}

startServer();
