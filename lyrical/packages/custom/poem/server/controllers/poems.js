'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Poem = mongoose.model('Poem'),
  _ = require('lodash');


/**
 * Find poem by id
 */
exports.poem = function(req, res, next, id) {
  Poem.load(id, function(err, poem) {
    if (err) return next(err);
    if (!poem) return next(new Error('Failed to load poem ' + id));
    req.poem = poem;
    next();
  });
};

/**
 * Create an poem
 */
exports.create = function(req, res) {
  var poem = new Poem(req.body);
  poem.user = req.user;

  poem.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the poem'
      });
    }
    res.json(poem);

  });
};

/**
 * Update an poem
 */
exports.update = function(req, res) {
  var poem = req.poem;

  poem = _.extend(poem, req.body);

  poem.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the poem'
      });
    }
    res.json(poem);

  });
};

/**
 * Delete an poem
 */
exports.destroy = function(req, res) {
  var poem = req.poem;

  poem.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the poem'
      });
    }
    res.json(poem);

  });
};

/**
 * Show an poem
 */
exports.show = function(req, res) {
  res.json(req.poem);
};

/**
 * List of poems
 */
exports.all = function(req, res) {
  Poem.find().sort('-created').populate('user', 'name username').exec(function(err, poems) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the poems'
      });
    }
    res.json(poems);

  });
};
