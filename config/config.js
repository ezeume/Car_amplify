// require("dotenv").config();

module.exports = {
  "development": {
    "username": "fm79p6lquiwyh4z2",
    "password": null,
    "database": "e8w3su6mkp1c2fdd",
    "host": "pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "root",
    "password": "null",
    "database": "database_production",
    "host": "localhost",
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
