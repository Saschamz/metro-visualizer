import css from './style.css';
import { lines } from './lineData';

const socket = io();

socket.on('status', status => {
  clearTrains();
  
  console.log('All Lines: ', status);

  const allLines = [].concat.apply([], status);
  
  const line14 = allLines.filter(x => x.line === '14');
  
  console.log('Line 14:', line14);
  renderTrains(allLines);
});

function renderTrains(trains) {
  trains.forEach(train => {
    if (train.time === 0) renderAtStation(train);
    else if (train.time === 1) renderOnTracks(train);
  });
}

function renderAtStation({ stop, line, destination, direction }) {
  const station = getStation(stop, line);
  const going = direction === 1 ? 'up' : 'down';
  const activeAffix = going === 'up' ? 'active--up' : 'active--down';

  if (station) {
    station.setAttribute('data-content', destination);
    station.classList.add('active', activeAffix);
  }
}

function renderOnTracks({ stop, destination, line, direction }) {
  const station = getStation(stop, line);
  const going = direction === 1 ? 'up' : 'down';
  console.log(direction);

  if (station) {
    console.log('Found Tracks: ', station, 'Going: ', going);
    if (going === 'down') {
      station.nextElementSibling.setAttribute('data-content', destination);
      station.nextElementSibling.classList.add('active', 'active--down');
    } else {
      station.previousElementSibling.setAttribute('data-content', destination);
      station.previousElementSibling.classList.add('active', 'active--up');
    }
  }
}

function getDirection(station, destination, stops) {
  const downStops = stops.slice(0, stops.indexOf(station));
  return downStops.includes(destination) ? 'down' : 'up';
}

function getStation(station, line) {
  const query = `.line-${line} .${station}`;
  return document.querySelector(query);
}

function clearTrains() {
  document.querySelectorAll('.active')
    .forEach(el => {
      el.classList.remove('active');
      el.classList.remove('active--up');
      el.classList.remove('active--down');
    });
}

lines.reverse().forEach((station, index) => {
  const _line = document.querySelector('.line');

  if (index !== 0 ) _line.innerHTML += '<div class="line-fill"></div>';

  _line.innerHTML += `
    <div class="stop ${station.replace(/\s+/g, '').toLowerCase()}">
      <span class="stop-label">
        ${station}
      </span>
    </div>
  `;
});
