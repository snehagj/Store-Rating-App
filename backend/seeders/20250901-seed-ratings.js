'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ratings', [
      { userId: 5, storeId: 1, score: 5, comment: 'Great!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, storeId: 1, score: 4, comment: 'Good selection', createdAt: new Date(), updatedAt: new Date() },
      { userId: 7, storeId: 2, score: 3, comment: 'Okay', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ratings', null, {});
  }
};
