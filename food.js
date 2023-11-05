const mongoose=require('mongoose')

const foodSchema=new mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    imageURL:{
        type:String
    }
})
module.export=mongoose.model('Food',foodSchema)