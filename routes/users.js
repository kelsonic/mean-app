var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: passwordHash.generate(req.body.password),
    email: req.body.email
  });
  user.save(function(err, result) {
    if (err) {
      return res.status(404).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(200).json({
      message: 'User successfully created',
      obj: result
    });
  })
});

router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, doc) {
    if (err) {
      return res.status(404).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!doc) {
      return res.status(404).json({
        title: 'No user found',
        error: {message: 'User not found'}
      });
    }
    if (!passwordHash.verify(req.body.password, doc.password)) {
      return res.status(404).json({
        title: 'Could not log you in.',
        error: {message: 'Invalid username or password.'}
      });
    }
    // Authentication expires in 1 hour
    var token = jwt.sign({user: doc}, 'jquerty!@#$', {expiresIn: 3600});
    res.status(200).json({
      message: 'Success',
      token: token,
      userId: doc._id
    });
  });
});

module.exports = router;