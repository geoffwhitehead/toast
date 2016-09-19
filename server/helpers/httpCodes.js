/**
 * Created by geoff on 19/09/16.
 */
/**
 * Friendly named variables for HTTP status codes.
 */
module.exports = {
  continue: 100,
  ok: 200,
  created: 201,
  accepted: 202,
  no_content: 204,
  reset_content: 205,
  partial_content: 206,
  multiple_choices: 300,
  moved_permanently: 301,
  found: 302,
  not_modified: 304,
  temporary_redirect: 307,
  permanent_redirect: 308,
  bad_request: 400,
  unauthorized: 401,
  payment_required: 402,
  forbidden: 403,
  not_found: 404,
  method_not_allowed: 405,
  not_acceptable: 406,
  request_timeout: 408,
  conflict: 409,
  gone: 410,
  length_required: 411,
  precondition_failed: 412,
  payload_too_large: 413,
  uri_too_long: 414,
  unsupported_media_type: 415,
  range_not_satisfiable: 416,
  expectation_failed: 417,
  unprocessable_entity: 422,
  locked: 423,
  failed_dependency: 424,
  upgrade_required: 426,
  too_many_requests: 429,
  internal_server_error: 500,
  not_implemented: 501,
  bad_gateway: 502,
  service_unavailable: 503,
  gateway_timeout: 504,
  insufficient_storage: 507
}