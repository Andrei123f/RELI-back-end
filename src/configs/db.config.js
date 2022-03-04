
/*
const env = process.env;
const fs = require('fs');
const envir = env.NODE_ENV || 'dev';

const db = {
    isProd: envir != 'dev',
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME || 'programming_languages',
    port: env.DB_PORT || 3306,
    ssl: {
      mode: 'VERIFY_IDENTITY',
      ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
    }
};

module.exports = db;
*/