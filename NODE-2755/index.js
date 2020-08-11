const { MongoClient } = require('mongodb');

(async function () {
  const client = new MongoClient('mongodb://localhost:31000?', {
    useUnifiedTopology: true
  })
  await client.connect()
  const db = client.db('example')
  const collection = db.collection('inventory')

  await collection.createIndex({ quote : "text" }, { defaultLanguage: 'spanish', languageOverride: "idioma" });

  const documents = [
    { idioma: "portuguese", quote: "A sorte protege os audazes" },
    { idioma: "spanish", quote: "Nada hay más surrealista que la realidad." },
    { idioma: "english", quote: "is this a dagger which I see before me" }
  ]

  console.log(await collection.listIndexes().toArray());

  await Promise.all(documents.map(doc => collection.insert(doc)));

  await client.close()
})()
