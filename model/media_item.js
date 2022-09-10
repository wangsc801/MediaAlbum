const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class MediaItem extends Model {}

MediaItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: 0,
      primaryKey: 1,
      autoIncrement: 1,
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: 0,
    },
    parent_name: {
      type: DataTypes.STRING,
      allowNull: 0,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: 1,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "MediaItem",
    paranoid: 1,
    tableName: "media_item",
  }
);
