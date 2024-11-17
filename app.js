import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiError from './utils/ApiError.js';
import GlobalErrorHandler from './utils/ApiError.js'
import { CLIENT_URI } from './constant.js';
import router from './routes/index.js';


const app = Express();

app.use(cors({
    origin: CLIENT_URI,
    credentials: true,
}));
app.use(cookieParser());
app.use(Express.json({ limit: '16kb' }));
app.use(Express.urlencoded({ extended: true, limit: '16kb' }));

// routes
app.use("/api", router);

// Invalid route error
app.all('*', (req, res, next) => {
    const error = new ApiError(404, `Can't find ${req.originalUrl}`);
    next(error);
});

app.use(GlobalErrorHandler);
export { app };