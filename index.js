const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ekuronr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const zooCollection =  client.db("zooLand").collection("animalCollection");
    const categoryCollection =  client.db("zooLand").collection("categoryCollection");


    //all animal data collection
    app.get('/animalCollection', async (req, res) => {
        const result = await zooCollection.find().toArray();
        res.send(result);
    })

    //all category collection
    app.get('/categoryCollection', async (req, res) => {
        const result = await categoryCollection.find().toArray();
        res.send(result);
    })

    //add new animal data in animal collection
    app.post('/animalDataAdd', async (req, res) => {
        const query = req.body;
        console.log(query);
        const result = await zooCollection.insertOne(query);
        res.send(result);
    })

    //add new category data in category collection
    app.post('/animalCategory', async (req, res) => {
        const query = req.body;
        console.log(query);
        const result = await categoryCollection.insertOne(query);
        res.send(result);
    })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("thezoolandserver is running");
})

app.listen(port, () => {
    console.log(`thezoolandserver is running on port ${port}`)
})
