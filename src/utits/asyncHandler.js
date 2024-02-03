import e from "express"

const asncHandler = (requestHandler) => {
   return (req, res , next) => {
      Promise.resolve(requestHandler(req, res, next)).catch(e => next(e))
   }
}

export default asncHandler 


 /*const asyncHandler = (fn) => async(res,req,next) => {
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