module.exports = function (express, passport, io) {
  var router = express.Router({mergeParams: true});
  router.use('/jobs', require('./api/v1/jobs')(express, passport));
  return router;
}