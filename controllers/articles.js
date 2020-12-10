const Article = require('../models/article');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const { ERROR_CODE } = require('../utils/error-code');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.send(articles);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
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
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const articleId = req.params.id;
    const cardForConfirm = await Article.findById(articleId);
    if (cardForConfirm === null) {
      throw new NotFoundError('Нет карточки с таким id');
    } else if (currentUser !== cardForConfirm.owner.toString()) {
      throw new Forbidden('Вы не владелец карточки и не можете её удалить');
    }
    const confirmedCard = await Article.findByIdAndRemove(articleId);
    res.send(confirmedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
