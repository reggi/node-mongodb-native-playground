Results from `run-without-data.sh`

```
MongoDB shell version v4.3.4
connecting to: mongodb://127.0.0.1:27017/admin?compressors=disabled&gssapiServiceName=mongodb
Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:341:17
@(connect):2:6
exception: connect failed
exiting with code 1
about to fork child process, waiting until server is ready for connections.
forked process: 69212
child process started successfully, parent exiting
running
connected
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
------ results ------
null
------ end-results ------
```


Results from `run-with-data.sh`

```
MongoDB shell version v4.3.4
connecting to: mongodb://127.0.0.1:27017/admin?compressors=disabled&gssapiServiceName=mongodb
Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:341:17
@(connect):2:6
exception: connect failed
exiting with code 1
about to fork child process, waiting until server is ready for connections.
forked process: 69170
child process started successfully, parent exiting
MongoDB shell version v4.3.4
connecting to: mongodb://127.0.0.1:27017/test?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("582d54ba-04d2-4431-a2bd-8d6ae002a143") }
MongoDB server version: 4.3.4
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5e669abb839f2392c5dce173")
}
running
connected
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
------ results ------
{ _id: 5e669abb839f2392c5dce173, example: true }
------ end-results ------
```