
module.exports = {
  format: 'JSON',
  timeWindow: '9',
  filters: 'Train=false&Bus=false&Tram=false&Ship=false',
  baseUrl: 'http://api.sl.se/api2/realtimedeparturesV4.',
  createUrl(id, key) {
    return `${this.baseUrl}${this.format}?key=${key}&siteid=${id}&timewindow=${this.timeWindow}&${this.filters}`;
  }
};