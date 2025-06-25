require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',   // 👈 default for dev
};
