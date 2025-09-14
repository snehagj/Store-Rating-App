'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ratings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      storeId: { type: Sequelize.INTEGER, references: { model: 'stores', key: 'id' }, onDelete: 'CASCADE' },
      score: { type: Sequelize.INTEGER, allowNull: false },
      comment: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') }
    });
    await queryInterface.addConstraint('ratings', {
      fields: ['userId', 'storeId'],
      type: 'unique',
      name: 'user_store_unique_rating'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('ratings', 'user_store_unique_rating');
    await queryInterface.dropTable('ratings');
  }
};
