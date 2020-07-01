const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:31000?replicaSet=rs&authSource=admin&readPreference=secondaryPreferred&retryWrites=true';

(async () => {
    const client = await MongoClient.connect(url , { useUnifiedTopology: true })
    const db = await client.db('media-providers');

    try {
        await db.collection('tests', { strict: true });
    } catch (err) {
        await db.createCollection('tests');
    }

    try {
        const result = await db.command({
            collMod: 'tests',
            validator: {
                $jsonSchema: {
                    type: 'object',
                    properties: {
                        score: { type: 'number' }
                    }
                }
            }
        });
        console.log('result', result);
    } catch (err) {
        console.error(err);
    }
})();