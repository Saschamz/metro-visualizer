const path =    require('path');
const app =     require('express')();
const server =  require('http').createServer(app);
const socket =  require('socket.io')(server);
const express = require('express');

const { getStatus } = require('./index.js');

let status = null;

socket.on('connection', client => {
  if (status === null) console.log('Exceeded API rate-limit');
  else client.emit('status', status);
});

getStatus()
  .then(update => {
    status = update;
    emitStatus();
    // setInterval(() => {
    //   getStatus()
    //     .then(update => {
    //       status = update
    //       emitStatus();
    //     });
    // }, 60 * 1000);
  });
  
const emitStatus = () => socket.emit('status', status);

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));