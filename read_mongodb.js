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
  
  // db.collection('users').findOne({name: 'wadawada'}, (error, result) => {
  //   if (error) {
  //     return console.log("An error occured")
  //   }

  //   console.log(result)
  // })

  // db.collection('users').findOne({_id: new ObjectId("62facc1f51486bea4f96fa14")}, (error, result) => {
  //   if (error) {
  //     return console.log("An error occured")
  //   }

  //   console.log(result)
  // })

  db.collection('users').find({ age: 27 }).toArray((error, result) => {
    if (error) {
      return console.log("an error occures")
    }
    console.log(result)
  })
  
  db.collection('users').find({ age: 23 }).count((error, result) => {
    if (error) {
      return console.log("an error occures")
    }
    console.log(result)
  })
  
  db.collection('users').findOne({ _id: new ObjectId("62facc1f51486bea4f96fa14") }, (error, result) => {
    if (error) {
      return console.log("an error occures")
    }
    console.log(result)
  })

})