const { MongoClient } = require('mongodb');

(async () => {
    const client = await MongoClient("mongodb://127.0.0.1");

    await client.connect();

    const db = client.db("test");

    await db.collection("test", { promiseLibrary: () => {} }).find().toArray();
    console.log('done')
    client.close()
})();
