const { MongoClient, ReadPreference } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;

(async function () {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    ignoreUndefined: true,
    useUnifiedTopology: true,
    readPreference: ReadPreference.SECONDARY_PREFERRED,
  })

  await client.connect()

  const db = client.db('example')

  db.collection('coll_test', {
    w: "majority",
    j: true,
    wtimeout: 5000,
  }, (error, collection) => {
    console.log(collection)
    client.close()
  });
})()
