const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017'
const dbName = 'project'
const collectionName = 'node-2663'
const client = new MongoClient(url, { useUnifiedTopology: true })

const data = [
  { hashId: '000000' },
  { hashId: '000001' },
  { hashId: '000002' },
  { hashId: '000003' },
  { hashId: '000004' },
  { hashId: '000005' },
  { hashId: '000006' },
  { hashId: '000007' },
  { hashId: '000008' },
  { hashId: '000009' },
  { hashId: '000010' }
]

function aggregate (collection, hashId, callback) {
  console.log(`----- starting aggregate with $match on hashId with value of ${hashId} -----`)
  collection.aggregate(
    [
      { $match: { hashId: hashId } },
      { $addFields: { newField: 'this is an added field!' } }
    ],
    function (err, cursor) {
      assert.strictEqual(err, null)
      cursor.toArray(function (err, documents) {
        assert.strictEqual(err, null)
        console.log(`----- documents changed by aggregate ${documents.length} -----`)
        callback(err, documents)
      })
    }
  )
}

function seed (collection, callback) {
  console.log('----- seeding... -----')
  collection.insertMany(data, function (err, res) {
    assert.strictEqual(null, err)
    console.log(`----- seed finished inserted ${res.insertedCount} documents -----`)
    callback(err, res)
  })
}

console.log('----- connecting to client... -----')
client.connect(function (err, client) {
  console.log('----- client connected -----')
  assert.strictEqual(null, err)
  const changeFired = []

  const close = () => {
    console.log(`----- changeStream "change" fired ${changeFired.length} times -----`)
    changeStream.close()
    client.close()
  }
  const db = client.db(dbName)
  const collection = db.collection(collectionName)
  const changeStream = collection.watch()

  changeStream.on('change', (next) => {
    console.log('----- change stream event -----')
    changeFired.push(next)
    console.log(next)
  })

  seed(collection, (err) => {
    assert.strictEqual(null, err)
    aggregate(collection, data[0].hashId, (err) => {
      assert.strictEqual(null, err)
      close()
    })
  })
})
