const getConnection =  require("./database/connection.js");

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const index = http.createServer(app);

getConnection();

index.listen(port);