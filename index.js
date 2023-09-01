'use strict';
const server = require('./src/server');
const { sequelize } = require('./src/models/index');

sequelize.sync()
  .then(() => {
    server.listen(3000, () => {
      console.log('Server UP on port 3000');
    });
  });