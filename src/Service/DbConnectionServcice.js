import mysql from 'mysql';
import config from '../config';

class DbConnectionService {
    constructor() {
        this.pool = mysql.createPool({
            host: config.db.host,
            port: config.db.port,
            database: config.db.name,
            user: config.db.user,
            password: config.db.password,
            queryFormat: function queryFormat(query, values) {
                return query.replace(/@(\w+)/g, (txt, key) => {
                  if (Object.prototype.hasOwnProperty.call(values, key)) {
                    return this.escape(values[key]);
                  }
        
                  return txt;
                });
              },
        });
    }
}

export default new DbConnectionService();
