const http = require('http');
const fs = require('fs');
let str=JSON.stringify;
let data = require('./text.json');

const server = http.createServer((req, resp) => {
  if (req.method === 'GET') {
    fs.readFile('./text.json', 'utf8', (err, jsonData) => 
    {
      if (err) 
      {
        resp.statusCode = 500;
        resp.end('Error in Reading ');
        return;
      }
      const parse_data = JSON.parse(jsonData);
      Object.assign(data, parse_data);

      fs.writeFile('./data.txt', str(data), 'utf8', (err) => 
      {
        if (err) {
          resp.statusCode = 500;
          resp.end('Error in Writing');
          return;
        }
        resp.setHeader('Content-Type', 'application/json');
        resp.end(str(data));
      });
    });
  }
});

const port=8080;
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
