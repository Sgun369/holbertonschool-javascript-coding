const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!\n');
    } else if (req.url === '/students') {
      const databaseName = process.argv[2]; // Assuming the database name is passed as an argument
      if (!databaseName) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: Database name not provided.\n');
      } else {
        fs.readFile(databaseName, 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading the file.\n');
          } else {
            // Filter out empty lines
            const students = data.split('\n').filter(line => line.trim() !== '');

            // You can now use the 'students' array as needed
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`This is the list of our students:\n${students.join('\n')}\n`);
          }
        });
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found\n');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed\n');
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
