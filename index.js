const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())


app.listen(port, () => console.log('listening to port', port))

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

const database = {
  "db": "shop",
  "ct": "items"
}

async function server() {
  try {
    await client.connect()
    const itemCollection = client.db(database.db).collection(database.ct)

    app.get('/items', async (req, res) => {
      const query = req.query
      const cursor = itemCollection.find()
      const data = cursor.sort({_id:-1})

      if (query.amount) {
        return res.send(await data.limit(Number(query.amount)).toArray())
      }
      res.send(await data.toArray())
      
    })
  } finally {

  }

}

server().catch(console.dir)