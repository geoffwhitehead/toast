var Model = require('../models/job.model').model;

/**
 * Public Functions
 */

var api = {};

api.get = function (id, cb) {
    if (!id) throw 'id parameter required.';
    Model.findOne({_id: id}, cb);
};

api.getAll = function (cb) {
    Model.find({}, cb);
};

api.create = function (properties, cb) {
    if (!properties) throw 'properties parameter required.';
    var c = new Model(properties);
    c.save(cb);
};

api.remove = function (id, cb) {
    if (!id) throw 'id parameter required.';
    Model.findOne({_id: id}, function (err, doc) {
        if (err || !doc) return cb(err, doc);
        doc.remove(cb);
    });
};

module.exports = api;