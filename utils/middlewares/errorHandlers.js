const printErrorHanlder = (error, req, res, next) => {
    console.log(error.stack);
    next(error);
}

const boomErrorHandler = (error, req, res, next) => {
    if(error.isBoom){
        res.status(error.output.statusCode).json({
            message: error.output.payload
        });
    }else{
        next(error);
    }
}

const generalErrorHandler = (error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}

module.exports = {printErrorHanlder, boomErrorHandler, generalErrorHandler }