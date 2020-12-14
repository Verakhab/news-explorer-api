const { Article } = require('../exne');
const { NotFoundError, Forbidden } = require('../errors');
const { NOT_FOUND, FORBIDDEN } = require('../constants');

const articlesGet = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userArticle = await Article.find({ owner: _id })
      .orFail(new NotFoundError(NOT_FOUND));
    res.send(userArticle);
  } catch (err) {
    next(err);
  }
};

const articlesPost = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const newArticle = await Article.create({
      keyword, title, text, date, source, link, image, owner: _id,
    });
    res.status(205).send(newArticle);
  } catch (err) {
    next(err);
  }
};

const articlesDelete = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).select('+owner')
      .orFail(new NotFoundError(NOT_FOUND));
    const articleOwner = article.owner.toString();
    if (req.user._id !== articleOwner) {
      throw new Forbidden(FORBIDDEN);
    } else {
      const articleDelete = await Article.findByIdAndRemove(article)
        .orFail();
      res.send(articleDelete);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  articlesGet,
  articlesPost,
  articlesDelete,
};
