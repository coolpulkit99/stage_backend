/* eslint-disable no-await-in-loop */
'use strict';
const { v4 : uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userUuid = 'fd6b8311-91d4-4ffa-9f17-7e480b31b9c9';
    await queryInterface.sequelize.query(
      `INSERT INTO public."user"(id,username) VALUES ('${userUuid}','apoorv_goyal');`);
    
    for (let i = 0; i < 100; i++) {
      const movieUuid = uuidv4();
      const seriesUuid = uuidv4();
      await queryInterface.sequelize.query(
        `INSERT INTO public.movie(id, title, description,  director) VALUES ('${movieUuid}', 'title${i}', 'desc${i}', 'director${i}');`);

      await queryInterface.sequelize.query(
        `INSERT INTO public.tv_show(id, title, description) VALUES ('${seriesUuid}', 'title${i}', 'desc${i}');`);
      await queryInterface.sequelize.query(
        `INSERT INTO public.user_list(id, user_id, movie_id, content_type) VALUES ('${uuidv4()}', '${userUuid}', '${movieUuid}', 'MOVIE');`
      );
      await queryInterface.sequelize.query(
        `INSERT INTO public.user_list(id, user_id, tv_show_id, content_type) VALUES ('${uuidv4()}', '${userUuid}', '${seriesUuid}', 'TV');`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
