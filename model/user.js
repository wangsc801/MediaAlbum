const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: 0,
      primaryKey: 1,
      autoIncrement: 1,
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: 0,
    },
    nickname: {
      type: DataTypes.STRING(64),
      allowNull: 1,
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: 0,
    },
    password_salt: {
      type: DataTypes.STRING(26),
      allowNull: 0,
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: 1,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: 1,
    },
    gender: {
      type: DataTypes.CHAR(1),
      defaultVlue: "0",
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "User",
    paranoid: 1,
    tableName: "user",
  }
);

module.exports = User;
