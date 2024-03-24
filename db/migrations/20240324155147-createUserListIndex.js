'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        CREATE INDEX idx_user_id_user_list ON public.user_list USING btree (user_id ASC NULLS LAST);
        

      `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        DROP INDEX idx_user_id_user_list;
        
      `);
  },
};
