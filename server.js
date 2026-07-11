import http from "node:http";
import {getdatafromdb} from "./db.js";
const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destination = await getdatafromdb();
  const urlobj =new URL(req.url,`http://${req.headers.host}`)
  const queryobj=Object.fromEntries(urlobj.searchParams.entries())
  //res.write('this is some data \n')
  //res.write('this is some data \n')
   if (urlobj.pathname === '/api'&& req.method === 'GET'){
    let filterdata = destination;
    if (queryobj.continent)//queryobj.pathname === 'continent' && queryobj.value
     { filterdata = filterdata.filter(item => item.continent.toLowerCase() === queryobj.continent.toLowerCase());
    }
    if (queryobj.country) {
      filterdata = filterdata.filter(item => item.country.toLowerCase() === queryobj.country.toLowerCase());
    }
    sendJSONResponse(res, 200, filterdata)}
    else if(req.url.startsWith('/api/continent/')&& req.method === 'GET' ){
    const continent = req.url.split('/').pop();
    const filteredData = destination.filter(item => item.continent.toLowerCase() === continent.toLowerCase());
    sendJSONResponse(res, 200, filteredData);
  }else if(req.url.startsWith('/api/country/') && req.method === 'GET'){
    const country = req.url.split('/').pop();
    const filteredData = destination.filter(item => item.country.toLowerCase() === country.toLowerCase());
    sendJSONResponse(res, 200, filteredData);
    res.statusCode=200;
    res.end(JSON.stringify(filteredData), 'utf8', () => console.log('response end'))
  }
  else{
    sendJSONResponse(res, 404, {message: 'not found'});
  };
;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})})// queery parameters are used to filter the data based on continent and country. The server responds with the filtered data in JSON format.
