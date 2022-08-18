const { MongoClient, ObjectId} = require('mongodb');

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

const id = new ObjectId // generate guid (ObjectID is deprecated, ıse ObjectId)
const timestamp = id.getTimestamp()

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database " + connectionUrl)
  }

  console.log("Connected to " + connectionUrl)

  const db = client.db(databaseName)
  db.collection('users').insertOne({
    name: 'Atalay',
    age: 23
  }, (error, result) => {
    if (error) {
      return console.log("Cannot insert user")
    }
    console.log(result)
  })

  db.collection('users').insertOne({
    _id: id,
    name: 'Atacan',
    age: 27,
  }, (error, result) => {
    if (error) {
      return console.log("Cannot insert user")
    }
    console.log(result)
  })

  db.collection('tasks').insertMany([
    {
      description: 'Learn node js, quick',
      completed: false,
    },
    {
      description: 'Learn mongodb insertMany command',
      completed: true,
    }
  ], (error, result) => {
    if (error) {
      return console.log("Cannot insert user")
    }
    console.log(result)
  })
})