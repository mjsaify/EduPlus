export const asyncHandler = (func) => {
    try {
        func(req, res, next).catch(err => next(err));
    } catch (error) {
        next(err)
    }
}