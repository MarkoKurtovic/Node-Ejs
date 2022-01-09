const express = require('express');
const res = require('express/lib/response');
const mongojs = require('mongojs');
const db = mongojs('marko', ['cars']);
const router = express.Router()

router.get('/', (req,res)=>{
    db.cars.find((err,data)=>{
        res.render('index', {data:data});
    });
})

router.get('/add',(req,res)=>{
    res.render('add-view');
})

router.post('/save', (req,res)=>{
    db.cars.insert({
        name : req.body.name,
        price : req.body.price,
        used : req.body.used
    },(err,data)=>{ 
        res.redirect('/')
    })
})

router.get('/edit/:id', (req,res) =>{
    let id = req.params.id;
    db.cars.findOne({"_id": db.ObjectId(id)}, (err,data)=>{
        res.render('edit-view', {data:data})
    })
})

router.get('/delete/:id', (req,res) =>{
    let id= req.params.id;
    db.cars.remove({"_id" : db.ObjectId(id)}, (err,data)=>{
        res.redirect('/')
    })
})

router.post('/update', (req,res) =>{
    let id= req.body.id;
    db.cars.update({"_id" : db.ObjectId(id)}, {$set:{
        name : req.body.name,
        price : req.body.price,
        used : req.body.used,

    }},(err,data)=>{
        res.redirect('/')
    })
})

module.exports = router;