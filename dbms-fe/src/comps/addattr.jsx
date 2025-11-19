import { useRef } from "react";

let attr_count = 0;

const ModalInput = ({ setcol, table_id, setactive, shape, col }) => {
  const input1ref = useRef(null);
  const input2ref = useRef(null);

  const sqlTypes = [
    "INT",
    "VARCHAR",
    "TEXT",
    "DATE",
    "BOOLEAN",
    "FLOAT",
    "DECIMAL",
    "CHAR",
    "TIMESTAMP",
  ];

  // Compute left/right lined-up positions
  const computeAttributePosition = (table, currentAttrCount) => {
    const verticalSpacing = 30; // vertical space between attributes
    const topOffset = 20; // from table top
    const rightX = table.x + table.width + 20; // 20px gap
    const leftX = table.x - 20; // 20px gap

    if (currentAttrCount < 3) {
      // Right side
      return {
        cx: rightX,
        cy: table.y + topOffset + currentAttrCount * verticalSpacing,
      };
    } else {
      // Left side
      return {
        cx: leftX,
        cy: table.y + topOffset + (currentAttrCount - 3) * verticalSpacing,
      };
    }
  };

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
        <h3>Enter Values</h3>
        <input ref={input1ref} type="text" placeholder="Name of attribute" />
        <select ref={input2ref} defaultValue="">
          <option value="" disabled>
            Select SQL Type
          </option>
          {sqlTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setactive(null);

            // Find the table object
            const table = shape.find((t) => t.id === table_id.current);
            if (!table) return;

            // Count existing attributes for this table from 'col'
            const currentAttrCount = col.filter(
              (attr) => attr.table_id === table_id.current
            ).length;

            // Compute cx/cy
            const { cx, cy } = computeAttributePosition(table, currentAttrCount);

            // Add attribute
            setcol((prev) => [
              ...prev,
              {
                type: "attribute",
                id: "a" + attr_count++,
                title: input1ref.current.value,
                dataType: input2ref.current.value,
                cx,
                cy,
                table_id: table_id.current,
              },
            ]);
          }}
        >
          CREATE ATTRIBUTE
        </button>
      </div>
    </div>
  );
};

export default ModalInput;
