'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('stores', [
      { name: 'Corner Grocery', email: 'grocery@example.com', address: '12 Market St', ownerId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Baker House', email: 'baker@example.com', address: '34 Baker St', ownerId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'ElectroMart', email: 'electro@example.com', address: '78 Tech Park', ownerId: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stores', null, {});
  }
};
