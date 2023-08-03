const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = async (password, hashPassword) => {
  const isMatch = await bcrypt.compareSync(password, hashPassword);
  return isMatch;
};

module.exports = {
  hashPassword,
  comparePassword,
};
