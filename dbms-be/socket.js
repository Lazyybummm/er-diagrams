import { json } from "express";
import { WebSocketServer } from "ws";
const wss=new WebSocketServer({port:8080})
let offsets=[{}]
wss.on("connection",(skt)=>{
    skt.on("message",(msg)=>{
        const parsed=JSON.parse(msg);
        if(parsed.type=='offset-request'){
        const response=offsets.find((s)=>{return s.tid==parsed.id});
        let offset;
        if(response){
             offset=response.gap+2*parsed.y+10;
        response.gap=offset
        }
        else{
            offset=2*parsed.y+10;
            const tid=parsed.id;
            offsets.push({tid,offset})
        }
        skt.send(JSON.stringify({payload:offset}))
        }
        wss.clients.forEach((s)=>{
            s.send(msg.toString());
        })
    })
})