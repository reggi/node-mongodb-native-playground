const MongoClient = require("mongodb");


(async () => {
    console.log('running')
    
    const client = await MongoClient("mongodb://127.0.0.1", { useUnifiedTopology: true });
    
    console.log('connected')

    const db = client.db("test");
    
    const collection = db.collection("test");

    setInterval(async () => {    
        try {
            const results = await collection.findOne({});
            console.log('------ results ------')
            console.log(results)
            console.log('------ end-results ------')
        } catch (err) {
            console.log(err.message)
        }
    }, 1000);

})();
