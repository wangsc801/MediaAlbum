var User = require("../model/user");
var md5 = require("js-md5");

function generateRandomStr(length) {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let salt = "";
  for (let i = 0; i < length; i++) {
    salt += chars[Math.floor(Math.random() * chars.length)];
  }
  return salt;
}

function findByUsername(username) {
  let findByUsername = User.findAll({
    where: {
      username: username,
    },
  });
  return findByUsername;
}

async function signup(user) {
  let userPassword = user.password;
  let salt = generateRandomStr(32 - userPassword.toString().length);
  encryptedPassword = md5(userPassword + salt);
  await User.create({
    username: user.username,
    nickname: user.nickname,
    email: user.email,
    password: encryptedPassword,
    password_salt: salt,
    phone: user.phone,
  });
}

const signService = {};
signService.signup = signup;
signService.generateRandomStr = generateRandomStr;
signService.findByUsername = findByUsername;

module.exports = signService;
