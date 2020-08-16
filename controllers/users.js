const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../exne');
const { BadRequest, NotFoundError, ConflictRequest } = require('../errors');
const { BAD_REQUEST, NOT_FOUND, CONFLICT_REQUEST } = require('../constants');
const { SECRET_STRING } = require('../config');

const userMe = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id)
      .orFail(new BadRequest(BAD_REQUEST));
    res.status(200).send({ email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

const userUp = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new ConflictRequest(CONFLICT_REQUEST);
    }
    const passHash = await bcrypt.hash(password, 10);
    const userNew = await User.create({
      email, password: passHash, name,
    });
    if (userNew) {
      res.status(201).send({
        email, name,
      });
    }
  } catch (err) {
    next(err);
  }
};

const userIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
      .orFail(new NotFoundError(NOT_FOUND));
    const passProv = await bcrypt.compare(password, user.password);
    if (!passProv) {
      throw new BadRequest(BAD_REQUEST);
    }
    const token = jwt.sign({ _id: user._id },
      SECRET_STRING,
      { expiresIn: '7d' });
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
    });
    res.status(200).send({ jwt: token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userMe,
  userUp,
  userIn,
};
