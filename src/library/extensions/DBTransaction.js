/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const { inTransaction } = require('@Library/DB/connection');

function DBTransaction() {
  const funcs = Array(arguments.length);
  for (let _len = arguments.length, _key = 0; _key < _len; _key += 1) {
    funcs[_key] = arguments[_key];
  }
  return function () {
    const args = Array(arguments.length);
    for (let _len2 = arguments.length, _key2 = 0; _key2 < _len2; _key2 += 1) {
      args[_key2] = arguments[_key2];
    }

    return inTransaction(async (connection, commit, rollback) => {
      let result;
      let ctr = 0;
      [].splice.call(args, 0, 0, connection);
      return funcs.reduce((prevPromise, resolver) => prevPromise.then(async () => {
        try {
          // eslint-disable-next-line prefer-spread
          result = await resolver.apply(undefined, args);
          ctr += 1;

          if (ctr === funcs.length) {
            commit(result);
          }
        } catch (err) {
          rollback(err);
        }
      }), Promise.resolve());
    });
  };
}

module.exports = DBTransaction;
