const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://harshitk04hr:harshitk04hr@cluster0.w4f4oqv.mongodb.net/todos')

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id:id},{completed:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id}= req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post('/add',(req,res)=>{
    const task = req.body.task; 
    TodoModel.create({
        task:task
    }).then(function(result){
        res.json(result)
    }).catch(function(err){
        res.json(err)
    })
})

app.listen(3001,function(){
    console.log("Server is running")
})