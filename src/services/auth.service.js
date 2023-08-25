const { BadRequestError } = require("../../errors");
const { User } = require("../../database/models");
const { comparePassword } = require("../utils/bcrypt");

class AuthService {
  user;
  constructor() {
    this.user = User;
  }
  async login(email, password) {
    const user = await this.user.findUserByEmail(email);
    if (!user) {
      return { message: "error", result: null };
    }
    const isMatched = await comparePassword(password);
    if (!isMatched) return { message: "error", result: null };
    return { message: "error", result: user };
  }

  async findUserByEmail(email) {
    const user = await this.user.findOne({ where: { email } });
    return user;
  }
}

module.exports = new AuthService();
