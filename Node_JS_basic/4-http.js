const http = require('http');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello Holberton School!\n');
});
app.listen(1245);
module.exports = app;
