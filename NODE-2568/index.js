/**
 *
 * Investigating https://jira.mongodb.org/browse/NODE-2568
 *
 */

const { MongoClient } = require('mongodb')
const { execSync } = require('child_process')
const dbServiceProvider = 'test';

const connString = process.env.MONGO_CONNECTION_STRING

const options = {
    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    minSize: 1,
    poolSize: 2,
    ssl: true,
    serverSelectionTimeoutMS: 2000,
    socketTimeoutMS: 2000,
    connectTimeoutMS: 2000,
    replicaSet: "Cluster0",
    w: "majority",
    retryWrites: true,
    authSource: 'admin'
};

function patchEmitter(emitter) {
    var oldEmit = emitter.emit;
    emitter.emit = function () {
        var emitArgs = arguments;
        console.log(emitArgs[0]);
        oldEmit.apply(emitter, arguments);
    }
}
async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function connect() {
    const client = await MongoClient.connect(connString, options);
    patchEmitter(client);
    return client.db(dbServiceProvider);
}
var count = 1;
var connected = false;
var dbClient;
var connectionStatus = new Map();
var connectionClosed = false;
async function test() {
    if (!connected) {
        console.log("connecting ====>");
        dbClient = await connect();
        connected = true;
    }
    while (true) {
        await wait(2000);
        var idx = ++count;
        var time = new Date().getTime();
        try {
            console.error("Connection status: ====>", connectionStatus);
            connectionStatus.set(idx, { status: "not_released", since: time });
            console.log('data loading', idx);
            const result = await dbClient.collection("tasks").find({}).limit(1).toArray();
            console.log('data loaded', idx);
            connectionStatus.set(idx, { status: "released", elapsed: new Date().getTime() - time });
        } catch (e) {
            console.error(e, 'error');
            console.error("elapsed time", new Date().getTime() - time);
            connectionStatus.set(idx, { status: "error", elapsed: new Date().getTime() - time });
        }
    }
}

async function closeConnection() {
    console.error("turn-off wifi =====> ")
    execSync("sudo networksetup -setnetworkserviceenabled Wi-Fi off")
    connectionClosed = true
    setTimeout(openConnection, 30000);
}

async function openConnection() {
    console.error("enable wifi =====> ")
    execSync("sudo networksetup -setnetworkserviceenabled Wi-Fi on")
    setTimeout(() => {
        connectionClosed = false
    }, 5000)
}

test();
setInterval(closeConnection, 60000);