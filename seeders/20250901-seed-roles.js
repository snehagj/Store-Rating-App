'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      { name: 'System Administrator' },
      { name: 'Normal User' },
      { name: 'Store Owner' }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
