import Sequelize, { Model } from 'sequelize';

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        students_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  associate(models) {
    this.belongsTo(models.Students, {
      foreignKey: 'students_id',
      as: 'students',
    });
  }
}

export default Checkin;
