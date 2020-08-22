const Phones = require('./routes/phoneRoute');
const home = require('./routes/home');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 6000;

app.use(express.json()); 
app.use('/api/phones', Phones); 
app.use('/', home);


mongoose
        .connect("mongodb://localhost/phonedb", {useNewUrlParser: true, useUnifiedTopology:true })
        .then(() => console.log("Connected to DB sucessfully..."))
        .catch(err => console.log("Error occured... : ", err)); 


app.listen(port, function(){
    console.log("Listing on port no " + port);
});
        


        