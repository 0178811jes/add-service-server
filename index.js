const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('assignment 11 is running')
});

app.listen(port, () =>{
    console.log(`Assignment 11 running on ${port}` )
});