var User = require("../model/user");
var md5 = require("js-md5");
const db = require("../db/db");

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

async function signin(identity, password) {
  let result = await db.sequelize.query(
    "select password,password_salt from user where username='" + identity + "'",
    { type: db.sequelize.QueryTypes.SELECT }
  );
  let inputedMd5Password = md5(password + result[0].password_salt);
  if (inputedMd5Password == result[0].password) {
    return true;
  }
  return false;
}

const signService = {};
signService.signup = signup;
signService.generateRandomStr = generateRandomStr;
signService.findByUsername = findByUsername;
signService.signin = signin;

module.exports = signService;
