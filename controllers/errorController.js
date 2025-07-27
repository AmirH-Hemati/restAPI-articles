const AppError = require("../utils/apiErrors");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProc = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(`Error ⛔⛔⛔⛔`, err);
    res.status(500).json({
      status: "error",
      message: "Something Went Very  Wrong ! ",
    });
  }
};

const handelValidationDBError = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data => ${errors.join(" , ")}`;
  return new AppError(message, 400);
};

const handelCastErrorDB = (error) => {
  const message = `Invalid  ${error.path} : ${error.value}`;
  return new AppError(message, 400);
};

const handelDuplicatedErrorDB = (error) => {
  const message = "duplicated Field value , pls use Another Value ! ";
  return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);
    if (error.name === "ValidationError")
      error = handelValidationDBError(error);
    if (error.name === "CastError") error = handelCastErrorDB(error);
    if (error.code === 11000) error = handelDuplicatedErrorDB(error);
    sendErrorProc(error, res);
  }
};
