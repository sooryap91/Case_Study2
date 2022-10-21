const mongoose=require('mongoose')//initialisation
//schema definition
const Schema=mongoose.Schema;
//modelling //creating an object employee_list and use all the powers of schema to it
const employee_list=new Schema({
    name:String,
    position:String,
    location:String,
    salary:Number
})
const employeedata=mongoose.model('employee',employee_list)
module.exports=employeedata