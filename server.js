require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./server/database/conn");
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 3000;

// paths of assests
const staticpath = path.join(__dirname, "assets")
const viewspath = path.join(__dirname, "templates/views");
const partialspath = path.join(__dirname, "templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(staticpath));

// set view engine
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath)

// load routers
app.use('/', require('./server/routes/router'));

// listening port
app.listen(port, ()=>{
    console.log(`server is running at ${port}`);    
});