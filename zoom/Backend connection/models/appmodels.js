import mongoose from 'mongoose'
const appdemo = new mongoose.Schema({
    name:{
        type:"String",
        required:true,
        unique:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String"
    },
    createdAT:{
        type:"String",
        default:"user"
    },
    updatedAT:{
        type:"String",
        default:"user"
    }
},{timestamps:true})

const appmodel= mongoose.model("appmodels",appdemo)
export default appmodel


