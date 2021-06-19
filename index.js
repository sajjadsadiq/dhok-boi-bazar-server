const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const app = express()

const port = process.env.PORT || 4444

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a0wc8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
  res.send('DhokBOiBazar Sever Site!')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('Connection Error!', err);
  const bookCollection = client.db("dhokboibazar").collection("books");

  // POST
  app.post('/addBook', (req, res) => {
      const bookData = req.body;
      console.log('adding new books collection', bookData);
      bookCollection.insertMany(bookData)
      .then(result => {
          console.log('Result Inserted Count!',result.insertedCount);
          res.send(result.insertedCount > 0)
      })
  })

  // GET
  app.get('/books', (req, res) => {
    bookCollection.find({}).limit(12)
    .toArray((err, documents) => {
      res.send(documents)
    })

  })
  // console.log('Database Successfull Connection!');
});


app.listen(port, () => {
  console.log(`Live Visit Website: http://localhost:${port}`)
})
