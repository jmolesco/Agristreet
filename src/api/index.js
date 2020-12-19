const { AdminAccess, AnonymousAccess } = require('@Library/middleware/auth');
const { UploadCSVStaffList } = require('./upload-csv');

function getAPIRoutes(express) {
  const { Router } = express;
  const router = new Router();
  router.post('/upload-staff-list-csv', AnonymousAccess(UploadCSVStaffList));

  return router;
}

module.exports = getAPIRoutes;
