const express = require("express");
const articleRouter = require("./routes/articleRoutes");
const AppError = require("./utils/apiErrors");
const errorController = require("./controllers/errorController");
const app = express();

app.use(express.json());
app.use("/api/v1/articles", articleRouter);

app.use((req, res, next) => {
  next(new AppError(`can't found this ${req.originalUrl} on the server!`, 404));
});

app.use(errorController);
module.exports = app;
