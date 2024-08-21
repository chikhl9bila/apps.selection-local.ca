const express = require("express")
const bodyParser = require("body-parser")
const clientRoute = require("./routes/consultantRoute")
const cors = require('cors');



const app = express()
app.use(cors());


app.use(express.static("public"))

app.use(bodyParser.json({ limit: '10mb' }));


app.use("/api/consultant" , clientRoute) ; 


module.exports = app ;  