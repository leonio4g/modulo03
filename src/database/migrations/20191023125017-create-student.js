
module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('students', {
        id: {
          type:Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
        },
        name:{
          type:Sequelize.STRING,
           allowNull:false,
        },
        email:{
          type:Sequelize.STRING,
           allowNull:false,
           unique:true
        },
        avatar_id:{
          type:Sequelize.INTEGER,
          references:{model:'file', key:'id'},
          onUpdate:'CASCADE',
          onDelete:'SET NULL',
          allowNull:true,
        },
        age:{
          type:Sequelize.INTEGER,
           allowNull:false,
        },
        height:{
          type:Sequelize.INTEGER,
           allowNull:false,
        },
        weight:{
          type:Sequelize.INTEGER,
           allowNull:false,
        },
        created_at:{
          type:Sequelize.DATE,
          allowNull:false,
         },
         updated_at:{
          type:Sequelize.DATE,
          allowNull:false,
         },
       });

  },

  down: (queryInterface,) => {

      return queryInterface.dropTable('studants');

  }
};
