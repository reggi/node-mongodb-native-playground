const assert = require('assert');
const MongoClient = require("mongodb");
const bluebird = require('bluebird');
const q = require('q');

(async () => {
    console.log('demonstrates promiseLibrary is working')

    const client = await MongoClient("mongodb://127.0.0.1", {
        promiseLibrary: bluebird,
        useUnifiedTopology: true
    });

    const db = client.db("test");

    const collectionPromise = db.collection("test").find().toArray();
    assert(collectionPromise instanceof bluebird)

    const results = await collectionPromise
    assert.equal(results.length, 0)
    console.log('done')
    client.close()
})();


(async () => {
    console.log('demonstrates promiseLibrary is overwritten')

    const client = await MongoClient("mongodb://127.0.0.1", {
        promiseLibrary: bluebird,
        useUnifiedTopology: true
    });

    const db = client.db("test");

    const collectionPromise = db.collection("test", { promiseLibrary: q }).find().toArray();
    assert(collectionPromise instanceof bluebird)

    const results = await collectionPromise
    assert.equal(results.length, 0)
    console.log('done')
    client.close()
})();
