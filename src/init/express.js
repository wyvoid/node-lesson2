'use strict';

import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multipart from 'multiparty';
import session from 'express-session';

module.exports = function (done) {

  const debug = $.createDebug('init:express');
  debug('initing Express...');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(multipart());
  app.use(session({
    secret: $.config.get('web.session.secret'),
  }));

  const router = express.Router();

  $.router = router;

  app.use(router);
  app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

  app.use('/api', function (err, req, res, next) {
    debug('API error: %s', err && err.stack || err);
    res.json({error: err.toString()});
  });

  app.listen($.config.get('web.port'), (err) => {
    done(err);
  });

};