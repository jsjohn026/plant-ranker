const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5500
require('dotenv').config()

let db, 
    dbConnectionStr = process.env.DB_STRING, 
    dbName = 'plants'

MongoClient.connect(dbConnectionStr, {})
    .then(client => {
      console.log(`Connected to ${dbName} Database`)
      db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(req, res) => {
  db.collection('plants').find().sort({likes: -1}).toArray()
  .then(data => {
    res.render('index.ejs', { info: data })
  })
  .catch(err => console.log(err))
})

app.post('/addPlant', (req, res) => {
  db.collection('plants').insertOne({
    plant: req.body.plant, 
    variety: req.body.variety, 
    likes: 0
  })
  .then(result => {
    console.log('Plant Added')
    res.redirect('/')
  })
  .catch(err => console.error(err))
})

app.put('/addOneLike', (req, res) => {
  db.collection('plants').updateOne({
    plant: req.body.plant, 
    variety: req.body.variety, 
    likes: req.body.likes
  },{
    $set: {
      likes: req.body.likes + 1
    }
  },{
    sort: {_id: -1},
    upsert: false
  })
  .then(result => {
    console.log('Added One Like')
    res.json('Like Added')
  })
  .catch(err => console.error(err))
})

app.delete('/deletePlant', (req, res) => {
  db.collection('plants').deleteOne({
    plant: req.body.plant, 
    variety: req.body.variety
  })
  .then(result => {
    console.log('Plant Deleted')
    res.json('Plant Deleted')
  })
  .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})