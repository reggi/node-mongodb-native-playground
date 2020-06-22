# NODE-2663

```
----- connecting to client... -----
----- client connected -----
----- seeding... -----
----- seed finished inserted 11 documents -----
----- starting aggregate with $match on hashId with value of 000000 -----
----- documents changed by aggregate 1 -----
----- changeStream "change" fired 0 times -----
```

With delay

```
➜  NODE-2663 git:(master) ✗ npm start

> node-2663@1.0.0 start /Users/thomasreggi/Desktop/git/reggi/node-mongodb-native-playground/NODE-2663
> mlaunch stop && rm -rf ./data && mlaunch init --replicaset --name rs --port 31000 && node ./index.js

sent signal Signals.SIGTERM to 3 processes.
launching: "mongod" on port 31000
launching: "mongod" on port 31001
launching: "mongod" on port 31002
replica set 'rs' initialized.
----- connecting to client... -----
----- client connected -----
----- seeding... -----
----- seed finished, inserted 11 documents -----
----- findOneAndUpdate started, updating hashId with value of 000000 ----
----- findOneAndUpdate finished, updated hashId with value of 000000 ----
----- aggregate starting with $match on hashId with value of 000001 -----
----- aggregate finished changed 1 document(s) -----
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000022B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1E80004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 2, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1e8, hashId: '000000' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1e8 }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000032B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1E90004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 3, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1e9, hashId: '000001' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1e9 }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000042B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1EA0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 4, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1ea, hashId: '000002' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1ea }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000052B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1EB0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 5, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1eb, hashId: '000003' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1eb }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000062B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1EC0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 6, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1ec, hashId: '000004' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1ec }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000072B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1ED0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 7, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1ed, hashId: '000005' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1ed }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000082B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1EE0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 8, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1ee, hashId: '000006' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1ee }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F000000092B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1EF0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 9, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1ef, hashId: '000007' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1ef }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F0000000A2B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1F00004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 10, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1f0, hashId: '000008' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1f0 }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F0000000B2B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1F10004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 11, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1f1, hashId: '000009' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1f1 }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F0000000C2B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1F20004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 12, high_: 1592851231 },
  fullDocument: { _id: 5ef0fb1fab3d7a951e36f1f2, hashId: '000010' },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1f2 }
}
----- change stream event -----
{
  _id: {
    _data: '825EF0FB1F0000000E2B022C0100296E5A100445860317C6524785BFD2DBF5B2094E4146645F696400645EF0FB1FAB3D7A951E36F1E80004'
  },
  operationType: 'update',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 14, high_: 1592851231 },
  ns: { db: 'project', coll: 'node-2663' },
  documentKey: { _id: 5ef0fb1fab3d7a951e36f1e8 },
  updateDescription: {
    updatedFields: { modified: 'this is an added field without aggregate' },
    removedFields: []
  }
}
----- changeStream "change" fired 12 times -----
```