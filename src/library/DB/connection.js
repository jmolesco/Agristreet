const mysql = require('mysql');
const config = require('../config');
const dbHelper = require('./dbhelper');
const helpers = require('../helpers');


function GetQueryComponents(conditions) {
  let where = '';
  let orderBy = '';
  let offSet = '';
  let limit = '';
  let groupBy = '';
  if (conditions) {
    if (conditions.where) {
      where = `  WHERE  ${conditions.where}`;
    }
    if (conditions.orderBy) {
      orderBy = ` Order BY ${conditions.orderBy}`;
    }
    if (conditions.limit) {
      limit = ` LIMIT ${conditions.limit}`;
    }
    if (conditions.offSet) {
      offSet = ` OFFSET ${conditions.offSet}`;
    }
    if (conditions.groupBy) {
      groupBy = ` Group BY ${conditions.groupBy}`;
    }
  }
  return {
    where, orderBy, groupBy, limit, offSet,
  };
}

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
});

const inTransaction = async body => new Promise((resolve, reject) => {
  pool.getConnection((err, conn) => {
    if (err) { reject(err); }
    conn.beginTransaction((tranErr) => {
      if (tranErr) { conn.release(); reject(tranErr); }

      body(conn, (result) => {
        conn.commit((errCommit) => {
          if (errCommit) {
            conn.rollback(() => {
              conn.release();
              reject(errCommit);
            });
          } else {
            conn.release();
            resolve(result);
          }
        });
      },
      (errCommit) => {
        conn.rollback(() => {
          conn.release();
          reject(errCommit);
        });
      });
    });
  });
});


module.exports = {
  db: pool,
  inTransaction,
  getDbContext: table => connection => ({
    getCount: conditions => new Promise((resolve, reject) => {
      const {
        where, orderBy, groupBy, limit, offSet,
      } = GetQueryComponents(conditions);

      dbHelper.executeQuery(connection || pool, {
        sql: `Select count(id) as count From ${table} ${where} ${orderBy} ${groupBy} ${limit} ${offSet}`,
        values: conditions ? conditions.params : undefined,
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        if (results && results.length > 0) {
          resolve(results[0].count);
        }
        resolve(0);
      });
    }),

    findOne: conditions => new Promise((resolve, reject) => {
      const {
        where, orderBy, groupBy, limit, offSet,
      } = GetQueryComponents(conditions);

      dbHelper.executeQuery(connection || pool, {
        sql: `Select * From ${table} ${where} ${groupBy} ${orderBy} ${limit} ${offSet}`,
        values: conditions ? conditions.params : undefined,
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        if (results && results.length > 0) {
          resolve(results[0]);
        }
        resolve(undefined);
      });
    }),

    find: conditions => new Promise((resolve, reject) => {
      const {
        where, orderBy, groupBy, limit, offSet,
      } = GetQueryComponents(conditions);
      dbHelper.executeQuery(connection || pool, {
        sql: `Select * From ${table} ${where} ${groupBy} ${orderBy} ${limit} ${offSet}`,
        values: conditions ? conditions.params : undefined,
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(results);
      });
    }),

    findById: id => new Promise((resolve, reject) => {
      dbHelper.executeQuery(connection || pool, {
        sql: `Select * From ${table} Where id = ?`,
        values: [id],
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        if (results && results.length > 0) {
          resolve(results[0]);
        }
        resolve(null);
      });
    }),
    findByIdWithStatus: (id, status = true) => new Promise((resolve, reject) => {
      dbHelper.executeQuery(connection || pool, {
        sql: `Select * From ${table} Where id = ? and status = ?`,
        values: [id, status],
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        if (results && results.length > 0) {
          resolve(results[0]);
        }
        resolve(null);
      });
    }),

    create: objModel => new Promise((resolve, reject) => {
      dbHelper.executeCommand(connection || pool,
        `Insert INTO ${table} SET ?`, objModel,
        (err, results) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(results);
        });
    }),
    bulkInsert: (cols, objModel) => new Promise((resolve, reject) => {
      dbHelper.executeCommand(connection || pool,
        `Insert INTO ${table} (${cols}) VALUES ?`, objModel,
        (err, results) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(results);
        });
    }),
    update: (objModel, conditions) => new Promise((resolve, reject) => {
      const {
        where,
      } = GetQueryComponents(conditions);
      dbHelper.executeCommand(connection || pool,
        `Update ${table} SET ? ${where}`, [{ ...objModel, uptime: helpers.getLocalDate() }, ...conditions.params],
        (err, results) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(results);
        });
    }),
    delete: conditions => new Promise((resolve, reject) => {
      const {
        where,
      } = GetQueryComponents(conditions);
      dbHelper.executeCommand(connection || pool,
        `DELETE FROM ${table} ${where}`, [...conditions.params],
        (err, results) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(results);
        });
    }),
    search: (query, conditions) => new Promise((resolve, reject) => {
      const {
        where, orderBy, groupBy, limit, offSet,
      } = GetQueryComponents(conditions);

      dbHelper.executeQuery(connection || pool, {
        sql: `${query} ${where} ${groupBy} ${orderBy} ${limit} ${offSet}`,
        values: conditions ? conditions.params : undefined,
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(results);
      });
    }),
    searchQuery: (query, params) => new Promise((resolve, reject) => {
      dbHelper.executeQuery(connection || pool, {
        sql: `${query}`,
        values: params || undefined,
      }, (err, results) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(results);
      });
    }),
    call: (spName, params) => new Promise((resolve, reject) => {
      dbHelper.executeCommand(connection || pool,
        `CALL ${spName} ?`, [[params]],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        });
    }),
  }),
};
