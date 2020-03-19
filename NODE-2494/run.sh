DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

rm -rf ./data
rm ./log*
mkdir -p ./data
touch ./log
mongo admin --eval 'db.shutdownServer()'
mongod --fork --dbpath data --logpath log
mongo test --eval 'db.test.insertOne({example: true})'
node $DIR/index.js
