rm -rf ./data
rm ./log*
mkdir -p ./data
touch ./log
mongo admin --eval 'db.shutdownServer()'
mongod --fork --dbpath data --logpath log
node ./index.js
