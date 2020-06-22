const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:31000?replicaSet=rs'
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
  console.log(`----- aggregate starting with $match on hashId with value of ${hashId} -----`)
  collection.aggregate(
    [
      { $match: { hashId } },
      { $addFields: { newField: 'this is an added field!' } }
    ],
    function (err, cursor) {
      assert.strictEqual(err, null)
      cursor.toArray(function (err, documents) {
        assert.strictEqual(err, null)
        console.log(`----- aggregate finished changed ${documents.length} document(s) -----`)
        callback(err, documents)
      })
    }
  )
}

function seed (collection, callback) {
  console.log('----- seeding... -----')
  collection.insertMany(data, function (err, res) {
    assert.strictEqual(null, err)
    console.log(`----- seed finished, inserted ${res.insertedCount} documents -----`)
    callback(err, res)
  })
}

function change (collection, hashId, callback) {
  console.log(`----- findOneAndUpdate started, updating hashId with value of ${hashId} ----`)
  const update = { $set: { modified: 'this is an added field without aggregate'} }
  collection.findOneAndUpdate({ hashId }, update, function (err, res) {
    assert.strictEqual(null, err)
    console.log(`----- findOneAndUpdate finished, updated hashId with value of ${hashId} ----`)
    callback(err, res)
  })
}

console.log('----- connecting to client... -----')
client.connect(function (err, client) {
  console.log('----- client connected -----')
  assert.strictEqual(null, err)
  const changeFired = []

  const close = () => {
    setTimeout(() => {
      console.log(`----- changeStream "change" fired ${changeFired.length} times -----`)
      changeStream.close()
      client.close()
    }, 1000)
  }
  const db = client.db(dbName)
  const collection = db.collection(collectionName)

  const changeStream = collection.watch()

  changeStream.on('change', (next) => {
    console.log('----- change stream event -----')
    changeFired.push(next)
    console.log(next)
  })

  setTimeout(() => {
    seed(collection, (err) => {
      assert.strictEqual(null, err)
      change(collection, data[0].hashId, (err) => {
        assert.strictEqual(null, err)
        aggregate(collection, data[1].hashId, (err) => {
          assert.strictEqual(null, err)
          close()
        })
      })
    })
  }, 1000)

})
