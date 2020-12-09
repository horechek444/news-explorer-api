const router = require('express').Router();
const { validateObjId, validateArticleBody } = require('../middlewares/validations');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles.js');

router.get('/', getArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/articleId', validateObjId, deleteArticle);

module.exports = router;
