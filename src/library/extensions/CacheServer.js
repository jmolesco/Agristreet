/* eslint-disable import/no-extraneous-dependencies */
const config = require('@Library/config');
const cache = require('memory-cache');

function CacheServer() {
  const save = (key, data) => {
    cache.put(key, data, parseInt(config.CACHE_EXPIRATION, 10));
  };

  const get = key => cache.get(key);

  return {
    save,
    get,
  };
}

module.exports = CacheServer;
