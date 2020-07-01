const assert = require('assert')
const { MongoClient } = require('mongodb');

class Harness {
  static async collection () {
    const client = new MongoClient('mongodb://localhost:31000?replicaSet=rs', {
      useUnifiedTopology: true
    })
    await client.connect()
    const db = client.db('example')
    const collectionName = 'collection'
    const collection = db.collection(collectionName)
    return [collection, client]
  }

  static async update ({collection, userData, pass}) {
    const update = await collection.updateOne({ _id: userData._id }, [
      {
        $set: {
          pass: pass
        },
      },
    ]);

    const find = await collection.findOne({ _id: userData._id })
    return [update, find]
  }
}

const withDollar = '$2a12Ez4snVWhyWbM5ozNxSqvCONuELToqb6xxj5PYpZtap3zT5QQ8mya'
const withoutDollar = '2a12Ez4snVWhyWbM5ozNxSqvCONuELToqb6xxj5PYpZtap3zT5QQ8mya'

let client
let collection

describe('NODE-2670', () => {
  before (async () => {
    [collection, client] = await Harness.collection()
  })

  after (async () => {
    await client.close(true)
  })

  // INSERT

  it('should insert doc where property does not start with `$`', async  () => {
    const pass = withoutDollar
    const user = await collection.insertOne({ name: 'X Æ A-Xii', pass })
    const userData = user.ops[0]
    assert.strictEqual(userData.pass, pass)
    assert.strictEqual(userData && Boolean(userData._id), true)
    return
  })

  it('should insert doc where property starts with `$`', async  () => {
    const pass = withDollar
    const user = await collection.insertOne({ name: 'X Æ A-Xii', pass })
    const userData = user.ops[0]
    assert.strictEqual(userData.pass, pass)
    assert.strictEqual(userData && Boolean(userData._id), true)
    return
  })

  // UPDATE

  it('Should update property starting with `$` to without `$`', async  () => {
    const startPass = withDollar
    const endPass = withoutDollar
    const user = await collection.insertOne({ name: 'X Æ A-Xii', pass: startPass })
    const userData = user.ops[0]
    const [update, find] = await Harness.update({collection, userData, pass: endPass})
    assert.strictEqual(find.pass, endPass)
    return
  })

  it('Should update property that does not start with `$` to with `$`', async  () => {
    const startPass = withoutDollar
    const endPass = withDollar
    const user = await collection.insertOne({ name: 'X Æ A-Xii', pass: startPass })
    const userData = user.ops[0]
    const [update, find] = await Harness.update({collection, userData, pass: endPass})
    assert.strictEqual(find.pass, endPass)
    return
  })

  // UPDATE FROM NOTHING

  it('Should add property to doc that starts with `$`', async  () => {
    const pass = withDollar
    const user = await collection.insertOne({ name: 'X Æ A-Xii' })
    const userData = user.ops[0]
    const [update, find] = await Harness.update({collection, userData, pass})
    assert.strictEqual(find.pass, pass)
    return
  })

  it('Should add property to doc that does not start with `$`', async  () => {
    const pass = withoutDollar
    const user = await collection.insertOne({ name: 'X Æ A-Xii' })
    const userData = user.ops[0]
    const [update, find] = await Harness.update({collection, userData, pass})
    assert.strictEqual(find.pass, pass)
    return
  })

})
