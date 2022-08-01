const mySql = require("mysql");


const connection = mySql.createConnection({
  host:'localhost',
  port: 3306,
  user: 'root',
  password: 'charityhub',
  database: 'charity',
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("Database Connected!");
});

module.exports = connection;
