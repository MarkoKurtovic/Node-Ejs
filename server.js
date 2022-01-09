const express = require('express');
const routes = require('./routes');
const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false})) 
app.use(routes);


app.listen(3000, () =>{
    console.log('listening to port 3000');
})