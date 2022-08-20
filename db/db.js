const dbConfig = require("./config");

const Sequelize = require("sequelize");

const sequelizeInstance = new Sequelize(
  dbConfig.db,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

async function syncAllModels() {
  await sequelizeInstance.sync();
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;
db.syncAllModels = syncAllModels;

module.exports = db;
