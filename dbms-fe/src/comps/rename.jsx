import { useRef } from "react"

function Rename({ setshape, setactive, table_id, wsref }) {
    const inputref = useRef();
    console.log("inside rename");
    
    function some() {
        setshape(prev => {
            const newShape = prev.map(s => 
                s.id === table_id 
                    ? { ...s, name: inputref.current.value } 
                    : s
            );
            
            // 🔥 WebSocket broadcast removed
            
            return newShape;
        });
        setactive(null);
    }
    
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <h3>Rename Table</h3>
                <input 
                    ref={inputref} 
                    type="text" 
                    placeholder="Enter new table name"
                    style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px"
                    }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                        onClick={some}
                        style={{
                            background: "#6C63FF",
                            color: "white",
                            padding: "10px 16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            flex: 1
                        }}
                    >
                        Change Name
                    </button>
                    <button 
                        onClick={() => setactive(null)}
                        style={{
                            background: "#ccc",
                            color: "#333",
                            padding: "10px 16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            flex: 1
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rename;
