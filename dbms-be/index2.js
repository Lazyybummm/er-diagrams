import si from "systeminformation";

async function logTopCPUApp() {
  try {
    const processes = await si.processes();

    // Sort by CPU usage (descending)
    const sorted = processes.list.sort((a, b) => b.cpu - a.cpu);

    // Pick top 1 process
    const top = sorted[0];

    console.clear();
    console.log("⚙️  Highest CPU-consuming process right now:");
    console.log("---------------------------------------------");
    console.log(`🧩 App Name : ${top.name}`);
    console.log(`🔥 CPU Usage: ${top.cpu.toFixed(2)}%`);
    console.log(`🆔 PID       : ${top.pid}`);
    console.log(`👤 User      : ${top.user}`);
    console.log("---------------------------------------------");
  } catch (err) {
    console.error("❌ Error fetching CPU info:", err);
  }
}

// Run every 5 seconds
setInterval(logTopCPUApp, 5000);
