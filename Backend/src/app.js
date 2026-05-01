import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/error.middleware.js';
import v1Routes from './routes/v1/index.js';

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.CORS_ORIGIN, process.env.DEV_ORIGIN],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'Date'],
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', v1Routes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
