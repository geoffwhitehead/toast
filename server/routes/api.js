module.exports = function (express) {
  var router = express.Router({mergeParams: true});
  router.use('/jobs', require('./api/jobs')(express));
  return router;
}