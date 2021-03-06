/* eslint-disable global-require */

/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { appEnv, ignoredSequelizeModels } from '../config';
import dbConfig from '../config/db';

const basename = path.basename(__filename);
const config = dbConfig[appEnv];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    if (!ignoredSequelizeModels.includes(path.parse(file).name)) {
      const model = require(path.join(__dirname, file)).default(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
