const Article = require("../models/articleModels");
// const ApiFeatures = require("../utils/apiFeatures");
// const AppError = require("../utils/apiErrors");
const {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");
exports.getArticles = getAll(Article);

exports.createArticle = createOne(Article);
exports.getArticle = getOne(Article);

exports.deleteArticle = deleteOne(Article);

exports.updateArticle = updateOne(Article);
