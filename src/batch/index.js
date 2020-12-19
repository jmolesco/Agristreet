/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
require('babel-polyfill');
const repository = require('@Library/repository');
const config = require('@Library/config');
const { spawn } = require('child_process');
const fs = require('fs');
const logger = require('@Library/extensions/Logger');
const helpers = require('@Library/helpers');

repository().BatchScheduleRepository
  .FindBatchScheduleForExecution().then((listBatch) => {
    logger.info(`Batch Start.... ${helpers.getLocalDate().toString()}`);
    const batchToRun = listBatch.filter(b => b.isScheduleNow);
    const strbatchToRun = batchToRun.map(b => b.name).join(',');
    logger.info(`Batch to execute ${strbatchToRun}`);
    const batchExec = batchToRun.map(batch => new Promise((resolve) => {
      if (batch.error) {
        resolve({ batch, success: false, error: batch.error });
      }
      const path = `./src/batch/${batch.name}`;
      fs.access(path, fs.F_OK, (err) => {
        if (err) {
          resolve({ batch, success: false, error: new Error(err) });
        }

        const ls = spawn('node', [path]);

        ls.stdout.on('data', (data) => {
          if (config.DEBUG) {
            if (Buffer.isBuffer(data)) {
              // eslint-disable-next-line no-console
              console.log(data.toString());
            } else {
              console.log(data);
            }
          }
        });

        ls.stderr.on('data', (error) => {
          resolve({ batch, success: false, error: new Error(error) });
        });

        ls.on('close', () => {
          resolve({ batch, success: true });
        });
      });
    }));
    Promise.all(batchExec.map(p => p.catch(e => e))).then((results) => {
      Promise.all(results.map((r) => {
        try {
          return repository()
            .BatchScheduleRepository
            .UpdateBatchRunTime(r.batch.id, r.success, r.batch.name, r.error).catch(e => e);
        } catch (err) {
          return err;
        }
      }))
        .then(() => {
          logger.info(`Batch End.... ${helpers.getLocalDate().toString()}`);
          process.exit(0);
        });
    });
  }).catch((err) => {
    logger.error(err.toString());
    logger.info(`Batch End.... ${helpers.getLocalDate().toString()}`);
    process.exit(0);
  });
