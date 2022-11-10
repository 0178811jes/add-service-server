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
        const orderCollection = client.db('software').collection('orders');

        app.get('/review', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const review = await cursor.limit(3).toArray();
            res.send(review);
        });
        app.get('/review-all', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });
        app.get('/review/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const review = await serviceCollection.findOne(query);
            res.send(review);

        });

        //orders api//

        app.get('/myreviews', async(req, res) =>{
           
            let query ={};
            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const cursor = orderCollection.find(query);
            const myreviews = await cursor.toArray();
            res.send(myreviews);
        })

        app.post('/orders', async(req, res) =>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        app.patch('/myreviews/:id', async(req, res) =>{
            const id = req.params.id;
            const status= req.body.status;
            const query = {_id: ObjectId(id)};
            const updatedDoc = {
                $set: {
                    status: status
                }
            }
            const result = await orderCollection.updateOne(query, updatedDoc);
            res.send(result);
        })
        // app.patch('/review-ret/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const status= req.body.status;
        //     const query = {_id: ObjectId(id)};
        //     const updatedDoc = {
        //         $set: {
        //             status: status
        //         }
        //     }
        //     const result = await orderCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // })

        app.delete('/myreviews/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await orderCollection.deleteOne(query);
            res.send(result);
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