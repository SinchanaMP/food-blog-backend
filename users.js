const mongoose=require ('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
 },
 passsword:{
    type:String,
    requires:true
 }
})

//creating a model for the schema
module.exports=mongoose.model('User',userSchema)
