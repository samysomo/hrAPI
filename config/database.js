const mysql = require("mysql2");
const util = require("util");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "taller_node.js"
});

pool.query = util.promisify(pool.query);
module.exports = pool;