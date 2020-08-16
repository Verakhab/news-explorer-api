const articlesRouter = require('express').Router();
const { articlesGet, articlesPost, articlesDelete } = require('../controllers/articles');
const { checkArticlePost, checkArticleDelete } = require('../middlewares/validations');

articlesRouter.get('/', articlesGet);

articlesRouter.post('/', checkArticlePost, articlesPost);

articlesRouter.delete('/:articleId', checkArticleDelete, articlesDelete);

module.exports = articlesRouter;
