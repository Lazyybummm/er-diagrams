import express from 'express';
import {Client} from "pg"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
const pgclient=new Client(process.env.CONNECTION_URL)

const app=express();
app.use(express.json());
app.use(cors());
async function main(){
    await pgclient.connect();
}
main();
app.post("/db-query",(req,res)=>{
    const queries=req.body.query;
    queries.forEach(element => {
        console.log(element);
        pgclient.query(element);
    });
})

app.listen(3000);