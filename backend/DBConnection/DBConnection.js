import {MongoClient} from "mongodb"
const uri= "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000"
const client = new MongoClient(uri
);
async function run() {
try {
// Connect the client to the server (optional starting in v4.7)
await client.connect().catch(err=>{
    console.log("error")
});
const res=await client.db("Projectman",{
    
}).collection("Users").insertOne({name:"alio",pass:"123456"}).then((res)=>{
    console.log(res)
    return res
   
    
}).catch(err=>{
    console.log("connection error")
    console.log(err)
    return "Connection error"
})
console.log("DB file")
console.log(res)
// Send a ping to confirm a successful connection
await client.db("ppdb").command({ ping: 1 }).then(res=>console.log(typeof res)).catch(err=>{
    console.log("connection error 2")
    console.log(err)
});
if (res.acknowledged===true) {
    const user=await client.db("Projectman",{
    
    }).collection("Users").findOne({name:4}).then(res=> {
        return res
    }).catch(err=>{
        return "no user found"
    })
    return user
    
} else {
    return "error"
    
}
}finally {
// Ensures that the client will close when you finish/error
await client.close();
}
}
// run().catch(console.dir);
export default run