const usersData = require('../data/users');

const getUsers = (req, res) => {
  res.json(usersData);
};

module.exports = {
  getUsers,
};
