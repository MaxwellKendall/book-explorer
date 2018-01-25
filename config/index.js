// here any environment specific variables/db connection secrets are gonna live etc...
const secrets = require('./config');

const getDbConnectionString = () => {
  return `mongodb://${secrets.uname}:${secrets.pwd}@ds215388.mlab.com:15388/bookexplorer`;
}

module.exports = {
  getDbConnectionString,
}
