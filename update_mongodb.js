const { MongoClient, ObjectId } = require('mongodb');

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

  db.collection('users').updateOne(
    {
      _id: new ObjectId("62facc1f51486bea4f96fa14")
    },
    {
      $set: {
        name: 'Atacanabe'
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })


  db.collection('users').updateOne(
    {
      _id: new ObjectId("62facc1f51486bea4f96fa14")
    },
    {
      $inc: {
        age: 1
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })


  db.collection('tasks').updateMany(
    {
      completed: false
    },
    {
      $set: {
        completed: true
      },
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
})