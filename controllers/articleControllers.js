const catchAsync = require("../utils/catchAsync");
const Article = require("../models/articleModels");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/apiErrors");
exports.getArticles = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Article.find(), req.query)
    .Filter()
    .Sort()
    .limitFields()
    .paginate();
  const articles = await features.query;
  res.status(200).json({
    status: "success",
    result: articles.length,
    data: {
      data: articles,
    },
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  const newArticle = await Article.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newArticle,
    },
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return next(new AppError("No article found with that ID ", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return next(new AppError("No article found with that ID ", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!article) {
    return next(new AppError("No article found with that ID ", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      data: article,
    },
  });
});
