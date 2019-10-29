import Sequelize, {Model} from 'sequelize';

class Enrollment extends Model{
  static init(sequelize){
    super.init(
      {
        start_date:Sequelize.DATE,
        end_date:Sequelize.DATE,
        total_price:Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
   associate(models){
    this.belongsTo(models.Students, {foreignKey: 'students_id', as:'students'});
    this.belongsTo(models.Plans, {foreignKey: 'plan_id', as:'plan'});
  }
}

export default  Enrollment;
