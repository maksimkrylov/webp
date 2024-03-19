'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Командир БибаБоба',
          email: 'biba@boba.ru',
          password: await bcrypt.hash('12341234', 10),
          img: 'https://cdnb.artstation.com/p/assets/images/images/016/657/059/large/alexandr-erohov-khorn-ava.jpg?1552981463',
          isAdmin: false,
          city: 'Сургут',
          backgroundImg: '/290631878743.jpg',
          contact: '+79123123123',
          birthDate: '09.07.1995',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin',
          email: 'admin@posttwit.ru',
          backgroundImg: '/290631878743.jpg',
          password: await bcrypt.hash('admin123', 10),
          img: 'https://www.cariblist.com/admin/assets/img/UserLogos/1473851754-avatar-generic.jpg',
          isAdmin: true,
          city: 'Санкт-Петербург',
          contact: 'www.postTwit.ru',
          birthDate: '09.02.2024',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Жабка Вася',
          email: 'vasya@zhabka.ru',
          backgroundImg: '/290631878743.jpg',
          password: await bcrypt.hash('12341234', 10),
          img: 'https://ipwatchdog.com/wp-content/uploads/2018/03/pepe-the-frog-1272162_640.jpg',
          isAdmin: false,
          city: 'Москва',
          contact: '+79968784323',
          birthDate: '19.03.1996',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Джаваскриптизёр Николай',
          email: 'otez@bibascrita.ru',
          backgroundImg: '/290631878743.jpg',
          password: await bcrypt.hash('12341234', 10),
          img: 'https://pikuco.ru/upload/test_stable/fe7/fe759db8726e9c7e2ecfcf6752c17000.webp',
          isAdmin: false,
          city: 'Стамбул',
          contact: '+79456456456',
          birthDate: '14.05.1993',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Лилька из Чертаново',
          email: 'ktoya@mail.ru',
          backgroundImg: '/290631878743.jpg',
          password: await bcrypt.hash('12341234', 10),
          img: 'https://poknok.art/uploads/posts/2022-09/1662997539_1-poknok-art-p-ava-utka-1.jpg',
          isAdmin: false,
          city: 'Москва',
          contact: '+79456456456',
          birthDate: '14.05.1993',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Анатолий',
          email: 'tolya@mail.ru',
          backgroundImg: '/290631878743.jpg',
          password: await bcrypt.hash('12341234', 10),
          img: 'https://elbrus-api-uploads.storage.yandexcloud.net/image_160_1_99e61bd837.png',
          isAdmin: false,
          city: 'Санкт-Петербург',
          contact: '+79218631109',
          birthDate: '14.05.1993',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
