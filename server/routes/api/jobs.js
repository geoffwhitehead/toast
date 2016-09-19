var codes = require('../../helpers/httpCodes');
var Job = require('../../models/job');

module.exports = function (express) {
  var router = express.Router({ mergeParams: true });
  var jobRouter = express.Router({ mergeParams: true });

  /**
   * @api {get} / Get a list of jobs.
   * @apiName ListJobs
   * @apiGroup Jobs
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/jobs
   */
  router.get('/', {session: false}), function (req, res) {
    Job.getAll(req.user, function (err, data) {
      console.log("getting jobs:  " + data);
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
  };

  /**
   * @api {post} / Create a new job.
   * @apiName CreateJob
   * @apiGroup Jobs
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/jobs
   */
  router.post('/', {session: false}), function (req, res) {
    Job.create(req.user, req.body, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      else return res.send(data);
    });
  };

  router.use('/:job_id', jobRouter);

  /**
   * @api {get} /:job_id Get details of a job.
   * @apiName GetJob
   * @apiGroup Jobs
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/jobs
   */
  jobRouter.get('/', {session: false}), function (req, res) {
    Job.findById(req.user, req.params.job_id, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
  };

  return router;
};