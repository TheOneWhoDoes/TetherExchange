const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Crawler2 = require("./server.js");
const cron = require("node-cron");
var cors = require('cors');

const userRouter = require('./routers/user')

const port = 8081;

const app = express();
const server = http.createServer(app);
const crawlerserver = new Crawler2("0");
crawlerserver.usdCrawl();

// use it before all route definitions
app.use(cors({origin: 'https://localhost:3000'}));
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () => {
  console.log("server is running at " + port);
});
