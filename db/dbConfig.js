let cfg = {
  host: 'localhost',
  port: '27017', // 空字符串使用默认端口: 27017
  database: 'miniapp_draw_meimei_test',
  username: '',
  password: ''
}

module.exports = {
  url: `mongodb://${cfg.host}:${cfg.port}`,
  dbName: cfg.database
};
