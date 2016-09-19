var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Job = function () {

    /**
     * Job Schema
     */

    var _schema = Schema({
        owner: {type: Schema.Types.ObjectId, ref: 'Job', required: true },
        name: {type: String, required: true},
        colour: {type: String, required: true},
        description: {type:String}
    }, { timestamps: true });

    /**
     * Job Model
     */

    var _model = mongoose.model('Job', _schema);

    /**
     * Public Functions
     */

    var _get = function (authenticated_user, id, cb) {
        if (!authenticated_user) throw new Error('User required.');
        if (!authenticated_user.domain) throw new Error('User domain required.');
        _model.find({domain: authenticated_user.domain, _id: id}, cb);
    };

    var _getAll = function (authenticated_user, cb) {
        if (!authenticated_user) throw new Error('User required.');
        if (!authenticated_user.domain) throw new Error('User domain required.');
        _model.find({domain: authenticated_user.domain}, cb);
    };

    var _create = function (authenticated_user, properties, cb) {
        if (!authenticated_user) throw new Error('User required.');
        if (!authenticated_user.domain) throw new Error('User domain required.');
        properties.domain = authenticated_user.domain;
        var c = new _model(properties);
        c.save(cb);
    };

    var _remove = function (authenticated_user, id, cb) {
        if (!authenticated_user) throw new Error('User required.');
        if (!authenticated_user.domain) throw new Error('User domain required.');
        _model.findOne({domain: authenticated_user.domain, _id: id}, function (err, doc) {
            if (err) return cb(err);
            if (!doc) return cb(err, doc);
            doc.remove(cb);
        });
    };

    /**
     * Module Export API
     */

    return {
        schema: _schema,
        model: _model,
        get: _get,
        getAll: _getAll,
        create: _create,
        remove: _remove
    };

}();

module.exports = Job;