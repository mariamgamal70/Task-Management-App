const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../database/user.db');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign(
      {
        userID: id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
  );
};
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // 1) check if email and pass exist
  if (!password) {
    return next(new AppError('Please provide password', 400));
  }
  if (!email ) {
    return next(new AppError('Please provide email/username', 400));
  }
  // 2) check if user exists and password is correct
  let user;
  if (email) {
    user = await User.scope('withPassword').findOne({ where: { email } });
  }
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) if everything is okay , send token to client
  createSendToken(user, 200, req, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
        new AppError('you are not logged in! please log in to gain access', 401),
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decoded.userID);
  if (!user) {
    return next(
        new AppError(
            'the user belonging to this token does no longer exist ',
            401,
        ),
    );
  }
  req.user = user;
  console.log('passed the protect middleware');
  next();
});
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate required fields
  if (!username || !email || !password || !confirmPassword) {
    return next(new AppError('Please provide all required fields', 400));
  }
  let user;   
  // Check if email exists
  user = await User.findOne({ where: { email } });
  if (user) {
    return next(new AppError('Email is already registered', 400));
  }

  // Create new user
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword
  });

  createSendToken(newUser, 201, req, res);
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
    console.log('Getting current user:', req.user);
  res.status(200).json({
    status: 'success',  
    data: {
      user: req.user
    }
  });
});