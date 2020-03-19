#!/bin/bash

mongod=/usr/local/mongodb/bin/mongod
mongod_data=/Users/michito/work/mongodb_data
mongod_log=/Users/michito/work/mongodb_log/mongodb.log
prog=mongod.sh
RETVAL=0

stop() {
    grep_mongo=`ps aux | grep -v grep | grep mongod`
    if [ ${#grep_mongo} -gt 0 ]
    then
	echo "stopping mongo..."
	PID=`ps aux | grep -v grep | grep mongod | awk '{ print $2 }'`
	`kill -9 ${PID}`
	RETVAL=$?
    else
	echo "mongo is not running..."
    fi
}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "cleaning data directory..."
rm -rf $DIR/data
mkdir -p $DIR/data

echo "cleaning logs..."
rm -rf $DIR/log
rm -rf $DIR/log*

echo "ensuring mongo is stopped..."
stop
sleep 1

echo "starting mongo..."
mongod --dbpath $DIR/data --logpath $DIR/log --fork

echo "testing connection..."
mongo test --eval 'db.test.insertOne({example: true})'

echo "npm install..."
npm install

echo "running node..."
node $DIR/index.js
