import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Authentications', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      valid: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      expiry_date: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    queryInterface.dropTable('Authentications');
  },
};

export default migration;