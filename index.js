// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const sequelize = require('./config/sequelize');
// Init sequelize
sequelize.init();
const app = require('./config/express');

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.info(`server started on port ${port} (${env})`));
}

module.exports = app;
