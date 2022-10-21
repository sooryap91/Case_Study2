// Task1: initiate app and run server at 3000
const express=require('express')
const app=express()
const path=require('path');
const mongoose=require('mongoose');
const employeedata =require('./model/employee');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json())//json related
app.use(express.urlencoded({extended: "true"}))//files related
// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://suriya091:susapadm@cluster0.iswcfwz.mongodb.net/CASE_STUDY?retryWrites=true&w=majority')


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

.then(()=>{
    console.log("My mongpdb is connected successfully!!")
})
.catch(error=>{
    console.log('Connection error'+error)
})






//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
    try{
employeedata.find().then(function(data){
    res.send(data)
})
}catch(error){
    console.log(error)
}
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',(req,res)=>{
    try{
    employeedata.findOne({"_id":req.params.id}).then(function(data){
res.send(data)
})
}catch(error){
    console.log(error)
}
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

//API//post
app.post('/api/employeelist',async(req,res)=>{
    try{
        let item=req.body;
        console.log('data from frontend',item)
        const user=new employeedata(item)
        const savedUser=await user.save()
        res.send()
        console.log(savedUser)
    }
    catch(error){
        console.log(error)
    }
})






//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{
    let id=req.params.id;
    employeedata.findByIdAndDelete({"_id":id}).then(()=>{
        res.send();
    })
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
    let id=req.body._id;
    employeedata.findByIdAndUpdate({"_id":id},{
    $set:{
        "name":  req.body.name,
        "location":req.body.location,
        "position":req.body.position,
        "salary":req.body.salary
    }
    })
    .then(function(){
    res.send();
    }) 
})
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
console.log(`Server is connectd in port ${PORT}`)
})



