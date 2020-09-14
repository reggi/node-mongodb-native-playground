Run with another process, passes:

```
➜  NODE-2784 git:(master) ✗ npm start

> @reggi/node-2784@1.0.0 start /Users/thomasreggi/Desktop/git/reggi/node-mongodb-native-playground/NODE-2784
> npm run replica-set


> @reggi/node-2784@1.0.0 replica-set /Users/thomasreggi/Desktop/git/reggi/node-mongodb-native-playground/NODE-2784
> export MONGODB_URI=mongodb://localhost:31000?replicaSet=rs && mlaunch stop || true && rm -rf ./data && mlaunch init --replicaset --name rs --port 31000 && mocha --timeout 60000 ./index.js

sent signal Signals.SIGTERM to 3 processes.
launching: "mongod" on port 31000
launching: "mongod" on port 31001
launching: "mongod" on port 31002
replica set 'rs' initialized.


  NODE-2784 - mongodb://localhost:31000?replicaSet=rs
    ✓ should simulate reporter scenario (11871ms)
    ✓ should create index on collection that doesn't exist [async] (361ms)


  2 passing (12s)
```

Run in isolation the test fails:


```
➜  NODE-2784 git:(master) ✗ ISOLATE=true npm start

> @reggi/node-2784@1.0.0 start /Users/thomasreggi/Desktop/git/reggi/node-mongodb-native-playground/NODE-2784
> npm run replica-set


> @reggi/node-2784@1.0.0 replica-set /Users/thomasreggi/Desktop/git/reggi/node-mongodb-native-playground/NODE-2784
> export MONGODB_URI=mongodb://localhost:31000?replicaSet=rs && mlaunch stop || true && rm -rf ./data && mlaunch init --replicaset --name rs --port 31000 && mocha --timeout 60000 ./index.js

sent signal Signals.SIGTERM to 3 processes.
launching: "mongod" on port 31000
launching: "mongod" on port 31001
launching: "mongod" on port 31002
replica set 'rs' initialized.


  NODE-2784 - mongodb://localhost:31000?replicaSet=rs
    1) should create index on collection that doesn't exist [async]


  0 passing (35ms)
  1 failing

  1) NODE-2784 - mongodb://localhost:31000?replicaSet=rs
       should create index on collection that doesn't exist [async]:
     MongoError: not master
      at MessageStream.messageHandler (node_modules/mongodb/lib/cmap/connection.js:266:20)
      at processIncomingData (node_modules/mongodb/lib/cmap/message_stream.js:144:12)
      at MessageStream._write (node_modules/mongodb/lib/cmap/message_stream.js:42:5)
      at doWrite (_stream_writable.js:441:12)
      at writeOrBuffer (_stream_writable.js:425:5)
      at MessageStream.Writable.write (_stream_writable.js:316:11)
      at Socket.ondata (_stream_readable.js:714:22)
      at addChunk (_stream_readable.js:294:12)
      at readableAddChunk (_stream_readable.js:275:11)
      at Socket.Readable.push (_stream_readable.js:209:10)
      at TCP.onStreamRead (internal/stream_base_commons.js:186:23)
```