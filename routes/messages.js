var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  Message.find()
    .populate('user', 'firstName')
    .exec(function(err, docs) {
      if (err) {
        return res.status(404).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: "Success",
        obj: docs
      });
    });
});

// Middleware to protect routes
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'jquerty!@#$', function(err, decodedToken) {
    if (err) {
      return res.status(401).json({
        title: 'Authentication failed',
        error: err
      });
    } else {
      next();
    }
  });
});

router.post('/', function(req, res, next) {

  var decoded = jwt.decode(req.query.token);

  User.findById(decoded.user._id, function(err, doc) {
    if (err) {
      return res.status(404).json({
        title: 'An error occured',
        error: err
      });
    }
    var message = new Message({
      content: req.body.content,
      user: doc
    });

    message.save(function(err, result) {
      if (err) {
        return res.status(404).json({
          title: 'An error occured',
          error: err
        });
      }

      doc.messages.push(result);
      doc.save();

      res.status(200).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});

router.patch('/:id', function(req, res, next) {
  
  var decoded = jwt.decode(req.query.token);

  Message.findById(req.params.id, function(err, doc) {
    if (err) {
      return res.status(404).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!doc) {
      return res.status(404).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    if (doc.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not authorized',
        error: {message: 'Message created by other user'}
      })
    }
    doc.content = req.body.content;
    doc.save(function(err, result) {
      if (err) {
        return res.status(404).json({
          title: 'An error occured',
          error: err
        });
      } else {
        res.status(200).json({
          message: 'Success',
          obj: result
        });
      }
    });
  });
});

router.delete('/:id', function(req, res, next) {
  
  var decoded = jwt.decode(req.query.token);

  Message.findById(req.params.id, function(err, doc) {
    if (err) {
      return res.status(404).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!doc) {
      return res.status(404).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    if (doc.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not authorized',
        error: {message: 'Message created by other user'}
      })
    }
    doc.remove(function(err, result) {
      if (err) {
        return res.status(404).json({
          title: 'An error occured',
          error: err
        });
      } else {
        res.status(200).json({
          message: 'Success',
          obj: result
        });
      }
    });
  });
});

module.exports = router;