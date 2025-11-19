import React from "react";

const SvgDropdown = ({ x, y, options = [], onChange, setactive, setshape, wsref, table_id, tableQueriesRef }) => {
  
  const handleNormalizationCheck = async (tableId) => {
    console.log("All queries in ref:", tableQueriesRef.current);
    console.log("Looking for table_id:", tableId);
    
    const sqlQuery = tableQueriesRef.current?.[tableId];
    
    if (!sqlQuery) {
      alert('Please apply the table first to generate SQL query');
      return;
    }
    
    console.log("Checking normalization for:", tableId);
    console.log("SQL Query:", sqlQuery);
    
    try {
      const res = await fetch("http://localhost:3000/norm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: sqlQuery }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result = await res.json();
      console.log("Normalization result:", result);
      
      alert(`Normal Form: ${result.normalForm}\n\nReasoning: ${result.reasoning}`);
      
    } catch (error) {
      console.error("Normalization check failed:", error);
      alert("Failed to check normalization");
    }
  };
  
  return (
    <foreignObject x={x} y={y} width={120} height={40}>
      <div xmlns="http://www.w3.org/1999/xhtml">
        <select
          defaultValue=""
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "6px",
            padding: "4px",
            fontSize: "14px",
          }}
          onChange={(e) => { 
            if(e.target.value === "Add Attribute"){
              setactive('Modal');
            }
            else if(e.target.value === 'Rename'){
              console.log("setting to rename");
              setactive('Rename');
            }
            else if(e.target.value === 'Delete Table'){
              setshape(prev => {
                const newShape = prev.filter(s => s.id !== table_id.current);

                // 🔥 WebSocket broadcasting (REMOVED)
                
                return newShape;
              });
              setactive(null);
            }
            else if(e.target.value === 'Check Normalization'){
              handleNormalizationCheck(table_id.current);
            }
          }}
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </foreignObject>
  );
};

export default SvgDropdown;
