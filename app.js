/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
require('babel-polyfill');


const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const repository = require('@Library/repository');
const getAPIRoutes = require('./src/api');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolver = require('./src/graphql/resolver');
const grahpqlErrorFormatter = require('./src/library/extensions/GraphqlError');
const config = require('./src/library/config');
const auth = require('./src/library/middleware/auth');
const helpers = require('./src/library/helpers');

const routes = getAPIRoutes(express);

const app = express();

app.use(bodyParser.json());

if (config.DEBUG) {
  app.get('/encrypt_password', async (req, res) => {
    let value = {};
    if (req.query.password) {
      value = await bcrypt.hash(req.query.password, 12);
    }
    res.send(value);
  });

  app.get('/generate_token', async (req, res) => {
    const value = {
      lineId: req.query.lineId,
    };
    const token = helpers.createToken(value, '1H');
    res.send(token);
  });

  app.get('/generate_access_key', async (req, res) => {
    const value = {
      appKey: config.APP_KEY,
    };
    const token = helpers.createToken(value);
    res.send(token);
  });
}

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
} else {
  const whitelist = config.WHITELIST_DOMAIN.split(',');
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Bad Request'));
      }
    },
  };
  app.use(cors(corsOptions));
}

const extensions = (async (requestInfo) => {
  if (typeof requestInfo.result.errors !== 'undefined') {
    const repo = repository();
    await repo.ErrorLogsRepository.LogErrors(requestInfo);
  }
});

// TODO: enable on phase 2 for security of requests
// app.use(auth.setAppKeyFlag);
app.use(auth.setAuthFlag);
app.use(auth.setLINEFlag);


app.get('/time', async (req, res) => {
  res.send(200, helpers.getLocalDate().getTime());
});


app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: config.DEBUG,
  customFormatErrorFn: grahpqlErrorFormatter,
  extensions,
}));

/*
app.use('/images/qr', auth.MemberImageAccess(
  async (req, res) => {
    if (!req.isAuth) {
      res.sendStatus(404);
    } else {
      const loc = path.resolve(__dirname, `./src/assets/images/${req.lineId}.png`);
      fs.access(loc, fs.F_OK, (err) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.sendFile(loc);
        }
      });
    }
  },
));

app.use('/admin/images/qr', auth.AdminAssetAccess(
  async (req, res) => {
    if (!req.isAuth) {
      res.sendStatus(404);
    } else {
      const loc = path.resolve(__dirname, `./src/assets/images/${req.query.filename}.png`);
      fs.access(loc, fs.F_OK, (err) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.sendFile(loc);
        }
      });
    }
  },
));
*/
/** ** THIS SECTION IS USE IN POITORE DEVELOPMENT. PLS SAVE */
app.use('/api', routes);
app.use('/download/csv', auth.AdminAssetAccess(
  async (req, res) => {
    if (!req.isAuth) {
      res.sendStatus(404);
    } else {
      const loc = path.resolve(__dirname, `./src/assets/csv/${req.query.filename}.csv`);
      fs.access(loc, fs.F_OK, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(404);
        } else {
          const file = fs.createReadStream(loc);
          file.on('end', () => {
            fs.unlink(loc, () => {
              // file deleted
            });
          });
          res.set('content-disposition', `attachment; filename="${req.query.filename}.csv"`);
          res.set('Content-Type', 'text/csv');
          file.pipe(res);
        }
      });
    }
  },
));
/** ******END OF POITORE DEVELOPMENT */

const customHost = process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const port = config.PORT || 3000;

// Start app.
const divider = '\n-----------------------------------';
app.listen(port, host, async (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Server started ! ✓');
  console.log(
    `Access URLs:${divider}
  Environment: ${config.NODE_ENV}
  Localhost: http://${prettyHost}:${port}${divider}
  Press CTRL-C to stop`,
  );
  return null;
});
