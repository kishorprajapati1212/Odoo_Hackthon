const express = require("express")
const mongooes = require("mongoose")
const cors = require("cors")
const productroute = require("./Routes/productroute")
const Forgotpass = require('./Routes/Forgotpass')
const cart = require("./Routes/Cartroute")
const sign = require('./Routes/Sign')
const app = express();
// app.use(express.json())
app.use(cors())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongooes.connect("mongodb://localhost:27017/Furniture")


app.use(productroute)
app.use(Forgotpass)
app.use(sign)
app.use(cart)

app.listen(1415, () =>{
    console.log("Backend is in Action")
})
