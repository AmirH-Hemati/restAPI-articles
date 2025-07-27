const express = require("express");
const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleControllers");

const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.route("/:id").get(getArticle).patch(updateArticle).delete(deleteArticle);
module.exports = router;
