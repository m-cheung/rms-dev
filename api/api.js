import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import config from '../public/config';
import logger from './utils/logger';

import shifts from './controllers/shiftsController';
import users from './controllers/usersController';

// import * as actions from './actions/index';
// import authority from './middleware/authority';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/login', authority.loginCheck, (req, res) => {
//   actions.login(req).then((result) => res.json(result));
// });

app.use('/users', users);
app.use('/shifts', shifts);


// Catch all for path errors
app.use((req, res) => {
  logger.logEvent('(404) Not Found', 'Request path ' + req.originalUrl);
  res.status(404).end('The request resource does not exist');
});


if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
