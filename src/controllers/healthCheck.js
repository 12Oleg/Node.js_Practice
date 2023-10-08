const healthCheck = (req, res) => {
    res.json({ status: 'Server is running' });
  };
  
  module.exports = {
    healthCheck,
  };
  