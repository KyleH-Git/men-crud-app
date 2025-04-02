// ***** Modules *****
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
// const { WebSocketServer } = require('ws');
// const http = require('http');
// const url = require('url');
// const uuidv4 = require('uuid').v4;

//WebSocket tutorial followed https://www.youtube.com/watch?v=4Uwq0xB30JE
// const server = http.createServer();
// const port = 8000;
// const connections = {};
// const users = {};
// const wsServer = new WebSocketServer({server});

const postCtrl = require('./controllers/post.js');
const authCtrl = require('./controllers/auth.js');

// ***** Middleware *****
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// const handleMessage = (bytes, uuid) => {

// };

// const handleClose = (uuid) => {

// };

// ***** DB Connection *****
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MonogoDB ${mongoose.connection.name}`);
});


app.get('/', async(req, res) => {
    res.redirect('post/home');
});

app.use('/post', postCtrl)
app.use('/auth', authCtrl);

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});

// wsServer.on("connection", (connection, req) => {
//     // ws://localhost:8000?username=Kyle

//     const { username } = url.parse(req.url, true).query
//     const uuid = uuidv4();
//     console.log(username)
//     console.log(uuid)
//     //broadcast // fan out
//     connections[uuid] = connection;

//     users[uuid] = {
//         username,
//         state: { 

//         }
//     }

//     connection.on('message', nessage => handleMessage(message, uuid));
//     connection.on('close', () => handleClose(uuid));
// });

// server.listen(port, () => {
//     console.log(`WebSocket server is running on port ${port}`);
// });
