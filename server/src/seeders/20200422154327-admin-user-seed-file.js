'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Admin',
          lastName: 'AAC',
          email: 'admin@aac.com',
          password:
            '$2b$10$8U56xTcwVCwNKyl7aNpU2u.0I5BgfjdLPow7Vlr.1pgkYox8QQyXK',
          role: 2,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', [
      {
        email: 'admin@aac.com',
      },
    ]);
  },
};
