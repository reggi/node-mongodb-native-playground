const { MongoClient } = require('mongodb');
const assert = require('assert');
const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);

(async function () {
  const client = new MongoClient(MONGODB_URI, {
    useUnifiedTopology: true
  })
  await client.connect()
  const db = client.db('example')
  const collection = db.collection('inventory')

  await collection.createIndex({ quote : "text" });

  const documents = [
    { idioma: "portuguese", quote: "A sorte protege os audazes" },
    { idioma: "spanish", quote: "Nada hay más surrealista que la realidad." },
    { idioma: "english", quote: "is this a dagger which I see before me" }
  ]

  const insertManyResult = await collection.insertMany(documents);
  assert.equal(insertManyResult.result.ok, 1); // check to see if writes were successful

  const listIndexResult = await collection.listIndexes().toArray()
  assert.equal(listIndexResult[0].name, '_id_'); // default index
  assert.equal(listIndexResult[1].name, 'quote_text'); // created index

  const find = await collection.find().toArray();
  assert.equal(find.length, 3); // check to see if the original items are still there

  await client.close()
  console.log('done');
})()
