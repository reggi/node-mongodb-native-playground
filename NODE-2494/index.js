const MongoClient = require("mongodb");

/**
 * 
 * Here's a version thats as close to the user's issue as I could make it.
 * 
 */

// (async () => {
//     console.log('running')

//     const client = await MongoClient("mongodb://127.0.0.1", { useUnifiedTopology: true });
    

//     client.collectionName = 'test'
//     client.name = 'thomas'
//     const token = '12345'
    
//     console.log('connected')

//     await client.connect();

//     const query = { example: true }
//     const update = { $set: { token: 'abcdef' } }

//     function findAndModifyCallback (err, doc) {
//         client.connect();
//         client.db().collection(client.collectionName).updateOne({
//             name: client.name
//         }, {
//             $set: {
//                 token: token
//             }
//         })
//         client.close();
//     }

//     client.db().collection(client.collectionName).findOneAndUpdate(query, update, (err, doc) => {
//         client.close();
//         findAndModifyCallback(err, doc);
//     });

// })();

/**
 * 
 * Here's a variant where I'm just trying to close down the client conenction and then open it up again.
 * 
 */

(async () => {
    console.log('running')

    const client = await MongoClient("mongodb://127.0.0.1/test", { useUnifiedTopology: true });
    
    const name = 'test'
    const query = { example: true }
    const update = { $set: { token: 'abcdef' } }
    
    await client.connect();
    console.log('connected')

    const doc = await client.db().collection(name).findOneAndUpdate(query, update);
    console.log('found and updated doc')
    console.log(JSON.stringify(doc))

    console.log('closing client')
    await client.close();

    console.log('opening client')
    await client.connect();

    console.log(client.isConnected())

    console.log('updating doc')
    const updates = await client.db().collection(name).updateOne(doc, { $set: { token: '12345' } })
    console.log('updated doc')
    console.log(JSON.stringify(updates))

    await client.close();

})();