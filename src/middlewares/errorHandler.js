const handleError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  console.log(error)
  res.status(error.statusCode).json({
    status: error.status,
    msg: error.message,
  });
};
export default handleError;
