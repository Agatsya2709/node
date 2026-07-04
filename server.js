import http from "node:http";
import {getdatafromdb} from "./db.js";
const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destination = await getdatafromdb();
  //res.write('this is some data \n')
  //res.write('this is some data \n')
   if (req.url === '/api'&& req.method === 'GET'){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode=200;
  res.end(JSON.stringify(destination), 'utf8', () => console.log('response end'))}else{
    res.statusCode=404;
    res.end(JSON.stringify({message: 'not found'}), 'utf8', () => console.log('response end'))
  };
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});