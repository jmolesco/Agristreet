/* eslint-disable no-console */
const config = require('../config');

function logQueryResult(queryID, callback) {
  return (err, results, fields) => {
    if (config.DEBUG) {
      console.log('-------------------------------------------------------');
      console.log(`Query ID : ${queryID}`);
      console.log(`Error: ${JSON.stringify(err, null, 2)}`);
      console.log(`Result: ${JSON.stringify(results, null, 2)}`);
    }
    callback(err, results, fields);
  };
}

function logQuery(queryID, query) {
  if (config.DEBUG) {
    console.log('-------------------------------------------------------');
    console.log(`Query ID: ${queryID}`);
    console.log(`SQL : ${query.sql}`);
    console.log('Params:');
    console.log(query.values);
    if (config.DEBUG_VERBOSE) {
      const e = new Error();
      console.log(e.stack.replace('Error', 'Origin:'));
    }
  }
}


const criteria = {
  EQUAL: (key, val) => ({ where: ` ${key} = ? `, value: val }),
  NOT_EQUAL: (key, val) => ({ where: ` ${key} <> ? `, value: val }),
  IN: (key, val) => ({ where: ` ${key} IN (?) `, value: val }),
  GREATER_THAN: (key, val) => ({ where: ` ${key} > ? `, value: val }),
  LESS_THAN: (key, val) => ({ where: ` ${key} < ? `, value: val }),
  GREATER_THAN_EQUAL: (key, val) => ({ where: ` ${key} >= ? `, value: val }),
  LESS_THAN_EQUAL: (key, val) => ({ where: ` ${key} <= ? `, value: val }),
  MATCH_BOOLEAN: (key, val) => ({ where: `MATCH (${key}) AGAINST(?)`, value: val }),
  FULL_LIKE: (key, val) => ({ where: ` ${key} LIKE CONCAT('%',?,'%') `, value: val }),
  PREFIX_LIKE: (key, val) => ({ where: ` ${key} LIKE CONCAT('%',?) `, value: val }),
  SUFFIX_LIKE: (key, val) => ({ where: ` ${key} LIKE CONCAT(?,'%') `, value: val }),
  CONSTANT: val => ({ where: ` ${val} ` }),
  BETWEEN: (key, val1, val2) => ({ where: ` ${key} BETWEEN ? AND ?`, value: [val1, val2] }), // NOT WORKING YET

};

const buildANDCriteria = (listCriteria, orderBy, offSet, limit, groupBy) => {
  const conditions = [];
  const params = [];

  Object.values(listCriteria).forEach((crit) => {
    conditions.push(crit.where);
    if (Object.prototype.hasOwnProperty.call(crit, 'value')) {
      params.push(crit.value);
    }
  });

  return {
    where: conditions.length > 0 ? ` ( ${conditions.join(' AND ')} ) ` : null,
    params,
    orderBy: orderBy && orderBy.length > 0 ? orderBy.join(',') : null,
    offSet,
    limit,
    groupBy: groupBy && groupBy.length > 0 ? groupBy.join(',') : null,
  };
};

const baseCriteria = () => {
  let conditions = [];
  let orderBy = [];
  let offSet;
  let limit;
  let groupBy = [];
  const joinCriteria = (operator, arrCriteria) => {
    const rootCriteria = buildANDCriteria(conditions, orderBy, offSet, limit, groupBy);
    const joinWhereCriteria = [];
    let joinParamCriteria = [];
    const joinOrderCriteria = [];
    let joinLimit = null;

    if (rootCriteria.where) {
      joinWhereCriteria.push(rootCriteria.where);
      joinParamCriteria = joinParamCriteria.concat(rootCriteria.params);
    }

    if (rootCriteria.orderBy) {
      joinOrderCriteria.push(rootCriteria.orderBy);
    }

    if (rootCriteria.limit) {
      // eslint-disable-next-line prefer-destructuring
      joinLimit = rootCriteria.limit;
    }

    Object.values(arrCriteria).forEach((crit) => {
      if (crit.getBuildCriteria) {
        const buildCondition = crit.getBuildCriteria();

        if (buildCondition.where) {
          joinWhereCriteria.push(buildCondition.where);
          joinParamCriteria = joinParamCriteria.concat(buildCondition.params);
        }

        if (buildCondition.orderBy) {
          joinOrderCriteria.push(buildCondition.orderBy);
        }

        if (!joinLimit && buildCondition.limit) {
          // eslint-disable-next-line prefer-destructuring
          joinLimit = buildCondition.limit;
        }
      } else {
        joinWhereCriteria.push(crit.where);
        joinParamCriteria = joinParamCriteria.concat(crit.params);

        if (crit.orderBy) {
          joinOrderCriteria.push(crit.orderBy);
        }

        if (!joinLimit && crit.limit) {
          // eslint-disable-next-line prefer-destructuring
          joinLimit = crit.limit;
        }
      }
    });

    return {
      ...rootCriteria,
      where: joinWhereCriteria.length > 0 ? ` ( ${joinWhereCriteria.join(` ${operator} `)} ) ` : null,
      params: joinParamCriteria,
      orderBy: joinOrderCriteria.length > 0 ? joinOrderCriteria.join(',') : null,
      limit: joinLimit,
    };
  };


  return {
    addCondition: (condition) => {
      conditions.push(condition);
    },
    clearCondition: () => {
      conditions = [];
      orderBy = [];
      offSet = null;
      limit = null;
      groupBy = [];
    },
    addGroupBy: (groupByCondition) => {
      groupBy.push(groupByCondition);
    },
    addOrderBy: (orderByCondition) => {
      orderBy.push(orderByCondition);
    },
    addOrderByDesc: (orderByCondition) => {
      orderBy.push(`${orderByCondition} DESC`);
    },
    setOffSet: (offSetCondition) => {
      offSet = offSetCondition;
    },
    setLimit: (limitCondition) => {
      limit = limitCondition;
    },
    /**
   *
   * @param {Pager} pager Set limit and offset to criteria
   */
    setPager: (pager) => {
      if (pager && pager.page > 0 && pager.maxRecord > 0) {
        offSet = (pager.page - 1) * pager.maxRecord;
        limit = pager.maxRecord;
      }
    },
    getBuildCriteria: () => buildANDCriteria(conditions, orderBy, offSet, limit, groupBy),
    joinANDCriteria: arrCriteria => joinCriteria('AND', arrCriteria),
    joinORCriteria: arrCriteria => joinCriteria('OR', arrCriteria),
  };
};

const executeQuery = (dbPool, queryConfig, callback) => {
  const queryID = new Date().toISOString();
  const query = dbPool.query(queryConfig, logQueryResult(queryID, callback));
  logQuery(queryID, query);
};

const executeCommand = (dbPool, queryConfig, param, callback) => {
  const queryID = new Date().toISOString();
  const query = dbPool.query(queryConfig, param, logQueryResult(queryID, callback));
  logQuery(queryID, query);
};


module.exports = {
  baseCriteria,
  criteria,
  buildANDCriteria,
  executeQuery,
  executeCommand,
};
