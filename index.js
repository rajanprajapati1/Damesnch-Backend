require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes')
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.Mongo_URI)
.then(()=>console.log("sucessfully connected to MongoDB"))
.catch((error)=>console.log(error +"something gone Wrong"))


app.use("/api/product", productRoutes);



app.listen(process.env.PORT || 8000,()=>{
    console.log(`Backend  Server Running on Port No:${process.env.PORT}`)
}) 