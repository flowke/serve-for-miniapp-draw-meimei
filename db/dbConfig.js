
let cfg = {
  host: 'localhost',

  dbName: 'miniapp_draw_meimei_test',
  user: '',
  pass: '',
  // authMechanism: 'SCRAM-SHA-1'
}

module.exports = createURL(cfg);

function createURL(op={}) {
  let {
    host,
    port,
    dbName,
    user,
    pass,
    ...options
  } = op;

  let auth = user&&pass ? `${user}:${pass}@`: '';
  let hosts = `${host}${port? ':'+port : ''}/`;
  let db = dbName || '' ;
  let qs = query(options);

  return 'mongodb://'+ auth+ hosts+ db+ qs;
}

function query(op={}) {
  let arr = [];

  for(let key in op){
    arr.push(`${key}=${op[key]}`)
  }

  return arr.length? '?'+ arr.join('&') : ''
}
