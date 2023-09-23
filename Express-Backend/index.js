const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const server=express()
server.use(cors());
server.use(bodyparser.json())

main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect('mongodb://0.0.0.0:27017/jaymawari');
    console.log('db.connected');
}

const userScheme=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User=mongoose.model('User',userScheme);

server.post('/demo',async(req,res)=>{
    let user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
    const doc=await user.save()

    console.log(req.body);
    res.json(doc)
})

server.get('/demo',async(re,res)=>{
    const docs=await User.find({})
    res.json(docs)
})

server.listen(5000,()=>{
    console.log(`Server Started`)
})