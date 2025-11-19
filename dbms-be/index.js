import express from 'express';
import {Client} from "pg"
import cors from "cors"
import dotenv from "dotenv";
import prompt from './prompt.js';
import Groq from 'groq-sdk/index.mjs';
dotenv.config();
const pgclient=new Client(process.env.CONNECTION_URL)
const groq=new  Groq({ apiKey:"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"})

const app=express();
app.use(express.json());
app.use(cors());
async function main(){
    await pgclient.connect();
}
main();

app.post("/state-request",async(req,res)=>{
    const {id}=req.body;
    const result = await pgclient.query(
        "SELECT schema_data FROM datacenter WHERE dc_id = $1",
        [id]
      );
      
      res.send(result.rows[0]);
})

app.post("/state-change", async (req, res) => {
    try {
      let { idref, name, schema_data } = req.body;
  
      if (!idref || !name || !schema_data) {
        return res.status(400).json({ success: false, message: "Missing idref, name, or schema_data" });
      }
  
      // Generate a random table_id if needed
      const randomTableId = Math.floor(Math.random() * 1000000).toString();
  
      // Ensure each table in shape has an id
      if (schema_data.shape && Array.isArray(schema_data.shape)) {
        schema_data.shape = schema_data.shape.map((table, idx) => {
          if (!table.id) table.id = `t${idx}`;
          return table;
        });
      }
  
      // Ensure each column has a table_id
      if (schema_data.col && Array.isArray(schema_data.col)) {
        schema_data.col = schema_data.col.map((col) => {
          if (!col.table_id) col.table_id = schema_data.shape[0]?.id || `t0`;
          return col;
        });
      }
  
      // Upsert into database
      const query = `
        INSERT INTO datacenter (dc_id, username, table_id, schema_data)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT(dc_id)
        DO UPDATE SET schema_data = $4
        RETURNING *;
      `;
      
      const values = [idref, name, randomTableId, JSON.stringify(schema_data)];
  
      const result = await pgclient.query(query, values);
  
      res.status(200).json({
        success: true,
        message: "Diagram state saved successfully",
        data: result.rows[0],
      });
    } catch (err) {
      console.error("Error saving diagram state:", err);
      res.status(500).json({ success: false, message: "Failed to save diagram state", error: err.message });
    }
  });
  
  
app.post("/db-query", async (req, res) => {
    try {
        const queries = req.body.query;
        console.log("Received queries:", queries);
        
        // Execute each query
        for (const element of queries) {
            await pgclient.query(element);
            console.log("Executed:", element);
        }
        
        console.log("Changes made successfully");
        
        // Send success response
        res.status(200).json({ 
            success: true, 
            message: "Database changes applied successfully",
            queriesExecuted: queries.length
        });
        
    } catch (e) {
        console.log("Some error occurred:", e);
        
        // Send error response
        res.status(500).json({ 
            success: false, 
            message: "Failed to apply changes",
            error: e.message 
        });
    }
});

async function chat(data){
    console.log("in chat function ");
   const response= await groq.chat.completions.create({
        messages:[
            {
                role:"system",
                content:prompt
            }
            ,
            {
                role:"user",
                content:data
            }
        ],
        model:
        "llama-3.3-70b-versatile"
    })
    return response.choices[0].message.content;
}



app.post("/norm",async(req,res)=>{
    try{
    const content=req.body.content;
    const response=await chat(content);
    console.log(response);
    res.send(response);
    }
    catch(e){
        console.log(e);
    }
})

app.listen(3000);