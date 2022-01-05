//Middleware to handle errors
const notFound = (req, res, next) => {
    const error = new Error(`Resource Not Found: ${req.originalUrl}`);
    console.log(error);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };