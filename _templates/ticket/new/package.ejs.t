---
to: ./<%= jira %>/package.json
sh: cd ./<%= jira %> && npm install
---
{
  "name": "@reggi/<%= h.changeCase.lower(jira) %>",
  "version": "1.0.0",
  "private": true,
  "description": "Testing out jira ticket <%= jira %>",
  "main": "index.js",
  "scripts": {
    "server": "export MONGODB_URI=mongodb://localhost:31000 && mlaunch stop || true && rm -rf ./data && mlaunch init --single --port 31000 && node ./index.js",
    "replica-set": "export MONGODB_URI=mongodb://localhost:31000?replicaSet=rs && mlaunch stop || true && rm -rf ./data && mlaunch init --replicaset --name rs --port 31000 && node ./index.js",
    "start": "npm run <%= locals['topology'] || 'server' %>"
  },
  "author": "Thomas Reggi",
  "dependencies": {
    "mongodb": "<%= locals['version'] || '3.6.0' %>"
  }
}
