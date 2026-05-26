import mongoose from 'mongoose'

export const Base =async ()=>{
  try{
const base =await mongoose.connect(process.env.MONGO_URI)
console.log("db connected")
}catch(e){
    console.log("error",e)

}

 }
 export default Base


 