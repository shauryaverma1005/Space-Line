const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);       
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}

export {asyncHandler}
