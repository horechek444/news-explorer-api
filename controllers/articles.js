const Article = require('../models/article');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const {
  BAD_REQUEST_ERROR_CODE,
  FORBIDDEN_MESSAGE,
  INCORRECT_ID_MESSAGE,
  CAST_ERROR,
  VALIDATION_ERROR,
} = require('../utils/utils');

const getArticles = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const articles = await Article.find({ owner });
    res.send(articles);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const owner = req.user.id;
    await Article.create({
      owner, keyword, title, text, date, source, link, image,
    });
    res.send({
      keyword, title, text, date, source, link, image,
    });
  } catch (err) {
    if (err.name === CAST_ERROR || err.name === VALIDATION_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const { articleId } = req.params;
    const articleForConfirm = await Article.findById(articleId).select('+owner');
    if (articleForConfirm === null) {
      throw new NotFoundError(INCORRECT_ID_MESSAGE('статьи'));
    } else if (currentUser !== articleForConfirm.owner.toString()) {
      throw new Forbidden(FORBIDDEN_MESSAGE);
    }
    const confirmedArticle = await Article.findByIdAndRemove(articleId);
    res.send(confirmedArticle);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
