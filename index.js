const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qkf0jrq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('software').collection('review');

        app.get('/review', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);

            app.get('/review/:id', async(req, res) =>{
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const review = await serviceCollection.findOne(query);
                res.send(review);

            })
        })
    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/', (req,res) =>{
    res.send('assignment 11 is running')
});

app.listen(port, () =>{
    console.log(`Assignment 11 running on ${port}` )
});