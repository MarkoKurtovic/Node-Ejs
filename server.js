const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('marko', ['cars']);

const app = express()
app.set('view engine', 'ejs');
//input parser
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    db.cars.find((err,data)=>{
        res.render('index', {data:data});
    });
})

app.get('/add',(req,res)=>{
    res.render('add-view');
})

app.post('/save', (req,res)=>{
    db.cars.insert({
        name : req.body.name,
        price : req.body.price,
        used : req.body.used
    },(err,data)=>{ 
        res.redirect('/')
    })
})
app.listen(3000, () =>{
    console.log('listening to port 3000');
})