import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Pega conexao que esta em database.js
    this.connection = new Sequelize(databaseConfig);

    // Percorrer pelos modelos
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://192.168.99.100:32768:2707/gobarber',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
