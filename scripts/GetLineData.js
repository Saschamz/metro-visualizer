const { apiKeys } = require('../config');
const axios = require('axios');

const lines = [
  'Fruängen', 
  'Västertorp', 
  'Hägerstensåsen',
  'Telefonplan',
  'Midsommarkransen',
  'Liljeholmen',
  'Hornstull',
  'Zinkensdamm',
  'Mariatorget',
  'Slussen',
  'Gamla Stan',
  'T-Centralen',
  'Östermalmstorg',
  'Stadion',
  'Tekniska Högskolan',
  'Universitetet',
  'Bergshamra',
  'Danderyds Sjukhus', 
  'Mörby Centrum',
];

const promises = lines.map(line => {
  return axios.get(`http://api.sl.se/api2/typeahead.JSON?key=${apiKeys.platsUppslag}&searchstring=${line}&stationsonly=true&maxresults=1`);
});

axios.all(promises)
  .then(res => res.map(x => x.data.ResponseData))
  .then(responses => {
    console.log(responses);
  });