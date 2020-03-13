const server = require('./controllers');
// const hostname = process.env.HOSTNAME;
// const port = process.env.PORT;

const hostname = 'localhost';
const port = '3000';

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

