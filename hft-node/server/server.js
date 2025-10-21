 import { createServer } from 'https'

 const hostname = '192.168.7.2';
 const port = 8080;

 const server = createServer((req, res) => {
    res.statusCode = 200;
    res.end('Hello');
 })

 server.listen(port, hostname, () => {});