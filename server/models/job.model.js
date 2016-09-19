var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Job = function () {

    /**
     * Job Schema
     */

    var _schema = Schema({
        name: {type: String, required: true},
        description: {type:String}
    }, { timestamps: true });

    /**
     * Job Model
     */

    var _model = mongoose.model('Job', _schema);

    return {
        schema: _schema,
        model: _model
    };

}();

module.exports = Job;