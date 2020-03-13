const http = require('http');
const url = require('url');
const contacts = require('./functions');

module.exports = http.createServer(async (req, res) => {
  let pathname = url.parse(req.url, true).pathname;
  const method = req.method.toLowerCase();
  const params = req;
  if(pathname !== '/') {
    params.id = pathname.replace(/\D/g,'');
    pathname = 'idContato';
  };
  let body = '';

  body = JSON.parse((await new Promise((resolve, reject) => {
    req.on('data', chunk => {
      resolve(chunk);
    })
  })).toString());

  const availableMethods = {
    'idContato': ['put', 'get'],
    '/': ['post', 'get'],
  }
  console.log("oi")
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (!Object.keys(availableMethods).includes(pathname)
    ||!availableMethods[pathname].includes(method)) {
      res.statusCode = 404;
      res.end(JSON.stringify({ data: "Rota não encontrada"}))
      return;
    }

  const response = await (contacts[pathname][method])({ ...body, ...params });
  res.statusCode = response.status;
  res.data = response.data;
  res.end(JSON.stringify(response.data));
})