// createServer.js [1]

// const http = require('http');

// http
//   .createServer((req, res) => {
//     console.log('get message');
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('Hello nodejs');
//     res.end();
//   })
//   .listen(3000);

// 왜 콘솔값으로 get message가 두 번이 나올까?
// 이유는 파비콘 때문입니다.

const http = require('http');

http
  .createServer((req, res) => {
    console.log(`get message ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello nodejs');
    res.end();
  })
  
  .listen(3000);