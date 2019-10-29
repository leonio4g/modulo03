import Sequelize from 'sequelize';
import User from '../app/models/User';
import Students from '../app/models/Students';
import Plan from '../app/models/Plans';
import Enrollment from '../app/models/Enrollment';
import Checkin from '../app/models/Checkin';
import databaseConfig from '../config/database';

const models = [User,Students,Plan,Enrollment,Checkin];

class Database {
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));

  }
}

export default new Database();
