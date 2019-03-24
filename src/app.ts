import express = require('express');
import http = require("http");
import bodyParser = require('body-parser')
import {Routing} from "./routing";
import {Observable} from "rxjs";


// Create Express server
export const app = express();
export var httpPort = normalizePort(process.env.QUEUE_PORT || 81);

app.use(bodyParser.json({limit: '500mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let queueMethodsRouter = express.Router();              // get an instance of the express Router
//export let passportConfig=new PassportConfig();
//queueMethodsRouter.post('/login', passportConfig.login);
//queueMethodsRouter.post('/isSessionValid', passportConfig.isSessionValid);
let routing=new Routing();
queueMethodsRouter.post('/userQueue.update.v2', routing.userQueueUpdateV2);

app.set("port", httpPort);
app.use("/api/user_queue", queueMethodsRouter);

export let httpServer = http.createServer(app);
httpServer.on('error', onError)
httpServer.on("listening", onListening);
//httpServer.listen(httpPort);


function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
}

function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("QUEUE_SERV: Listening on " + bind);
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    console.error(error);

    //var bind = typeof port === "string"
    throw error;
    /*
      var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }*/
}


/**
 * Event listener for HTTP server "listening" event.
 */
