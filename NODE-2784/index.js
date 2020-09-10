const { MongoClient } = require('mongodb');
const assert = require('assert');
const MONGODB_URI = process.env.MONGODB_URI;

const documents = [
  { idioma: "portuguese", quote: "A sorte protege os audazes" },
  { idioma: "spanish", quote: "Nada hay más surrealista que la realidad." },
  { idioma: "english", quote: "is this a dagger which I see before me" }
]

const reporterOptions = {
  readPreference: 'primaryPreferred'
}

describe(`NODE-2784 - ${MONGODB_URI}`, () => {

  it.skip('should simulate reporter scenario', async () => {
    const client = new MongoClient(MONGODB_URI, {
      useUnifiedTopology: true,
      ...reporterOptions
    })
    await client.connect()
    const db = client.db('db-one')
    const collection = await db.collection('collection-one')
    // insert data
    const insertManyResult = await collection.insertMany(documents);
    assert.equal(insertManyResult.result.ok, 1); // check to see if writes were successful
    // create initial index
    const createdIndexA = await collection.createIndex({ quote : "text" });
    assert.equal(createdIndexA, 'quote_text');
    // try and create same index again to simulate it exists
    const createdIndexB = await collection.createIndex({ quote : "text" });
    assert.equal(createdIndexB, 'quote_text');
    // check the indexes
    const listIndexResult = await collection.listIndexes().toArray()
    assert.equal(listIndexResult[0].name, '_id_'); // default index
    assert.equal(listIndexResult[1].name, 'quote_text'); // created index
    assert.equal(listIndexResult.length, 2);
    // ensure collection is still there
    const find = await collection.find().toArray();
    assert.equal(find.length, 3); // check to see if the original items are still there
    await client.close(true)
  })

  it("should create index on collection that doesn't exist", async () => {
    console.log('a');
    const client = new MongoClient(MONGODB_URI, {
      useUnifiedTopology: true,
      ...reporterOptions
    })
    console.log('b');
    await client.connect()
    console.log('c');
    const db = client.db('db-two')
    console.log('d');
    const collection = await db.collection('db-two')
    console.log('e');
    console.log('f');
    const createdIndexA = await collection.createIndex({ quote : "text" });
    console.log('g');
    assert.equal(createdIndexA, 'quote_text');
    console.log('h');
    await client.close(true)
  });

});

