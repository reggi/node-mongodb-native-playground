rm -rf ./data
kill :31000 --force
fkill :31001 --force
fkill :31002 --force
fkill :31003 --force
mlaunch init --replicaset --nodes 3 --arbiter --name rs --port 31000 --enableMajorityReadConcern --setParameter enableTestCommands=1 --dir ./data/replica_set