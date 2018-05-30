
const host = 'localhost';
const port = '27017';

let cfg = {
  dbName: 'miniapp_draw_meimei_test',
  user: '',
  pass: ''
}

module.exports = {
  url: `mongodb://${host}:${port}`,
  options: cfg
};
