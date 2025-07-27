const express = require("express");
const AppError = require("./utils/apiErrors");
const errorController = require("./controllers/errorController");
const articleRouter = require("./routes/articleRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  next(new AppError(`can't found this ${req.originalUrl} on the server!`, 404));
});

app.use(errorController);
module.exports = app;
