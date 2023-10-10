const { ERRORS } = require('../config/constants');

const handleNotFound = (req, res, next) => {
    res.status(404).json({ error: ERRORS.NOT_FOUND });
  };
  
  const handleInternalServerError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR });
  };
  
  module.exports = {
    handleNotFound,
    handleInternalServerError,
  };
  