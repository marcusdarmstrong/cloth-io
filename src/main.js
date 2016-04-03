process.env.TZ = 'America/New_York';

import 'babel-polyfill';
import express from 'express';
import path from 'path';
import SocketIO from 'socket.io';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';

import htmlHandler from './html-handler';
import postHandler from './handlers/post';
import homeHandler from './handlers/home';
import shareHandler from './handlers/share';

import addPost from './api/add-post';
import addComment from './api/add-comment';
import createAccount from './api/create-account';
import login from './api/login';
import signOut from './api/sign-out';
import isEmailAvailable from './api/is-email-available';
import isNameAvailable from './api/is-name-available';

import { readAuthTokenFromCookies } from '../auth-token';

const app = express();
app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'));
const io = SocketIO.listen(server);

app.use(compression());

app.use('/public', express.static(path.join(__dirname, '..', 'public'), {
  maxAge: 1000 * 60 * 60 * 24 * 365,
}));

app.use(favicon(`${__dirname}/../public/favicon.ico`));
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/api/addPost', addPost);
app.post('/api/addComment', addComment(io));
app.post('/api/createAccount', createAccount);
app.post('/api/login', login);

app.get('/api/signOut', signOut);
app.get('/api/isEmailAvailable', isEmailAvailable);
app.get('/api/isNameAvailable', isNameAvailable);

const handle = htmlHandler(io);
const getUserId = req => readAuthTokenFromCookies(req);
app.get('/', handle(req => homeHandler(getUserId(req), req.query.page)));
app.get('/p/:urlString', handle(req => postHandler(getUserId(req), req.params.urlString)));
app.get('/share', handle(req => shareHandler(getUserId(req))));
