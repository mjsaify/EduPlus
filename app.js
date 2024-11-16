import Express from 'express';
import ApiError from './utils/ApiError.js';
import GlobalErrorHandler from './utils/ApiError.js'

const app = Express();

app.use(Express.json({ limit: '16kb' }));
app.use(Express.urlencoded({ extended: true, limit: '16kb' }));

app.all('*', (req, res, next) => {
    const error = new ApiError(404, `Can't find ${req.originalUrl}`);
    next(error);
});


app.use(GlobalErrorHandler);
export { app };