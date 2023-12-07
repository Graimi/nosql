const mongoose = require('mongoose');

const emptySchema = new mongoose.Schema({});

const Dog = mongoose.model('Dog', emptySchema);
const Owner = mongoose.model('Owner', emptySchema);

module.exports = {
  Dog,
  Owner,
};
