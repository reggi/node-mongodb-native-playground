const assert = require('assert');
const { MongoClient } = require('mongodb');

function filterForCommands(commands, bag) {
  commands = Array.isArray(commands) ? commands : [commands];
  return function(event) {
    if (commands.indexOf(event.commandName) !== -1) bag.push(event);
  };
}

(async () => {
  console.log('running')

  const client = await MongoClient("mongodb://127.0.0.1", {
    monitorCommands: true,
    useUnifiedTopology: true
  });

  const events = []

  client.on('commandStarted', filterForCommands(['find'], events));

  await client.connect();

  const db = client.db()
  const collection = db.collection('test')

  const find = collection.find({}).setReadPreference('secondaryPreferred')

  assert.equal(find.options.db.readPreference.mode, 'primary')
  assert.equal(find.options.readPreference.mode, 'secondaryPreferred')

  await find.toArray()

  assert.equal(events[0].command.$readPreference.mode, 'secondaryPreferred')

  client.close()

})();
