const axios = require('axios');
const { config, apiKeys } = require('../config');

function getStatus() {
  const ids = [
    9260, 9261, 9263, 9264, 9294, 9295, 9296, 9297, 9192, 9193, 9001,
    9206, 9205, 9204, 9203, 9202, 9201, 9200,
  ].map(id => axios.get(config.createUrl(id, apiKeys.realTid)));
  
  return axios.all(ids)
    .then(res => res.map(x => parseData(x.data.ResponseData.Metros)))
    .catch(err => console.log(err));
}


function parseData(data) {
  const minData = data.map(info => {
    const time = Number(info.DisplayTime.split(/\s+/)[0].replace(/Nu/, '0'));

    const direction = info.JourneyDirection;
    const line = info.LineNumber;
    const destination = info.Destination;
    const stop = info.StopAreaName.replace(/\s+/g, '').toLowerCase();
    console.log('Sending info with ', direction);

    if (isNaN(time)) return { time: 10, line, destination, stop, direction };
    return { time, line, destination, stop, direction };
  });
  
  return minData;
}

module.exports = { getStatus };

