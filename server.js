import http from "node:http";
import {getdatafromdb} from "./db.js";
const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destination = await getdatafromdb();
  const urlobj =new URL(req.url,`http://${req.headers.host}`)
  const queryobj=Object.fromEntries(urlobj.searchParams.entries())
  //res.write('this is some data \n')
  //res.write('this is some data \n')
   if (req.url === '/api'&& req.method === 'GET'){
    let filterdestination = destination;
    if (queryobj.continent)//queryobj.pathname === 'continent' && queryobj.value{
      filterdestination = filterdestination.filter(item => item.continent.toLowerCase() === queryobj.continent.toLowerCase());
    }
    if (queryobj.country) {
      filterdestination = filterdestination.filter(item => item.country.toLowerCase() === queryobj.country.toLowerCase());
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode=200;
  res.end(JSON.stringify(filterdestination), 'utf8', () => console.log('response end'))}
  else if(req.url.startsWith('/api/continent/')&& req.method === 'GET' ){
    const continent = req.url.split('/').pop();
    const filteredData = destination.filter(item => item.continent.toLowerCase() === continent.toLowerCase());
    res.setHeader('Content-Type', 'application/json');
    res.statusCode=200;
    res.end(JSON.stringify(filteredData), 'utf8', () => console.log('response end'))
  }else if(req.url.startsWith('/api/country/') && req.method === 'GET'){
    const country = req.url.split('/').pop();
    const filteredData = destination.filter(item => item.country.toLowerCase() === country.toLowerCase());
    res.setHeader('Content-Type', 'application/json');
    res.statusCode=200;
    res.end(JSON.stringify(filteredData), 'utf8', () => console.log('response end'))
  }
  else{
    res.statusCode=404;
    res.end(JSON.stringify({message: 'not found'}), 'utf8', () => console.log('response end'))
  };
;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
// query params {/api?continent=asia&country=india}