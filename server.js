import http from "node:http";
import {getdatafromdb} from "./db.js";
const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destination = await getdatafromdb();
  //res.write('this is some data \n')
  //res.write('this is some data \n')
   if (req.url === 'api'&& req.method === 'GET'){
  res.end(JSON.stringify(destination), 'utf8', () => console.log('response end'))};
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});