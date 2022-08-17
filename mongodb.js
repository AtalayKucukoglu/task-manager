const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database " + connectionUrl)
  }

  console.log("Connected to " + connectionUrl)

  const db = client.db(databaseName)
  db.collection('users').insertMany([{
    name: 'Atalay',
    age: 23
  },
  {
    name: 'wadawada',
    age: 24
  }], (error, result) => {
    if (error) {
      return console.log("Cannot insert user")
    }
    console.log(result)
  })
})