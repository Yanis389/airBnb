import { Sequelize } from 'sequelize-typescript';
import { Location } from '../models/location.model';

const sequelize = new Sequelize({
  database: 'airbnb',
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 8889,
  models: [Location],
});

export default sequelize;