const asncHandler = (requestHandler) => {
   (req, res , next) => {
      Promise.resolve(requestHandler(req, res, next));
      caches((err) => next(err))
   }
}

export default asncHandler


/* const asyncHandler = (fn) => async(res,req,next) => {
   try {
    await fn(req,res,next);
   } catch (error) {
     res.status(error.code || 500).json({
        success : false,
        message : error.message
     })
   }
}

export default asyncHandler */