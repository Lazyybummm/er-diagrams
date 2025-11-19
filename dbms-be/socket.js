import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let offsets = {};

wss.on("connection", (skt) => {
  console.log("Client connected");

  skt.on("message", (msg) => {
    const parsed = JSON.parse(msg);
    console.log("Received message:", parsed);

    if (parsed.type === 'offset-request') {
      const tid = parsed.id;
      let offset;

      if (offsets[tid]) {
        offset = offsets[tid] + 40;
        offsets[tid] = offset;
      } else {
        offset = 40;
        offsets[tid] = offset;
      }

      skt.send(JSON.stringify({
        type: 'offset-response',
        table_id: tid,
        offset: offset
      }));
    } else {
     
      wss.clients.forEach((client) => {
        if (client.readyState === 1) { 
          client.send(msg.toString());
        }
      });
    }
  });

  skt.on("close", () => {
    console.log("Client disconnected");
  });

  skt.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server running on ws://localhost:8080");