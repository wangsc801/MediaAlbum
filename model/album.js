const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class Album extends Model {}

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: 0,
      primaryKey: 1,
      autoIncrement: 1,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: 0,
    },
    cover: {
      path: DataTypes.STRING,
      allowNull: 1,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: 1,
    },
    who_can_see_it: {
      type: DataTypes.CHAR(1),
      defaultValue: "0",
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "Album",
    paranoid: 1,
    tableName: "album",
  }
);

module.exports = Album;
