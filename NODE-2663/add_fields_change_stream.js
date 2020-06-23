
/**
 * Run me using "npm run exec -- ./add_fields_change_stream.js"
 */
const { MongoClient } = require('mongodb');
(async function () {
  const client = new MongoClient('mongodb://localhost:31000?replicaSet=rs', {
    useUnifiedTopology: true
  })
  await client.connect()
  const db = client.db('example')
  const collection = db.collection('inventory')
  const changeStream = collection.watch([{ $addFields: { newField: 'this is an added field!' } }])
  setTimeout(() => {
    collection.insertOne({ a: 42 })
  }, 2000)
  const next = await changeStream.next()
  await changeStream.close()
  await client.close()
  console.log(next)
})()
