'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    const hash = await bcrypt.hash('Admin@123', saltRounds);
    const hash2 = await bcrypt.hash('Owner@123', saltRounds);
    const hash3 = await bcrypt.hash('User@123', saltRounds);
    // We're going to assume roles already seeded; ids 1=Admin,2=Normal,3=Owner
    await queryInterface.bulkInsert('users', [
      { name: 'Alice Admin', email: 'alice.admin@example.com', password: hash, address: 'Admin City', roleId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bob Admin', email: 'bob.admin@example.com', password: hash, address: 'Admin Town', roleId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Charlie Owner', email: 'charlie.owner@example.com', password: hash2, address: 'Owner Address 1', roleId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Diana Owner', email: 'diana.owner@example.com', password: hash2, address: 'Owner Address 2', roleId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eve User', email: 'eve.user@example.com', password: hash3, address: 'User Lane 1', roleId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Frank User', email: 'frank.user@example.com', password: hash3, address: 'User Lane 2', roleId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Grace User', email: 'grace.user@example.com', password: hash3, address: 'User Lane 3', roleId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
