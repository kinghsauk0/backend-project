class ApiError extends Error{
    constructor(
        statusCode,
        message = "somethig is wrong",
        errors = [],
        statck = false
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.statck = statck;
        this.success =false
        this.data = null;

        if(statck){
            this.statck = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export default ApiError