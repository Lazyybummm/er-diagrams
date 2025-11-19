import { useState } from "react";

const Apply = ({ shape, col, tableQueriesRef, idref,nameref }) => {
  const [isApplying, setIsApplying] = useState(false);

  async function handleApply() {
    if (!idref.current) {
      alert("No table selected!");
      return;
    }
    console.log(idref.current,nameref.current);

    setIsApplying(true);

    const schemaData = { shape, col };

    try {
      const res = await fetch("http://localhost:3000/state-change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idref: idref.current,
          schema_data: schemaData,
          name:nameref.current
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        tableQueriesRef.current = schemaData;
        alert("Diagram state saved successfully!");
      } else {
        throw new Error(result.message || "Failed to save");
      }
    } catch (err) {
      console.error("Apply error:", err);
      alert("Failed to save diagram: " + err.message);
    }

    setIsApplying(false);
  }

  return (
    <button
      onClick={handleApply}
      disabled={isApplying}
      style={{
        background: isApplying ? "#9e9e9e" : "#4CAF50",
        color: "white",
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        cursor: isApplying ? "not-allowed" : "pointer",
        fontWeight: "600",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {isApplying ? "Applying..." : "Apply changes in DB"}
    </button>
  );
};

export default Apply;
