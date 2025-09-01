import { useRef, useState } from "react";
import SvgDropdown from "../../comps/drop";
import tablespec from "../../utils";
import ModalInput from "../../comps/addattr";
import Apply from "../../comps/apply";

let table_count = 0;

function App() {
  const [active, setactive] = useState(null);
  const table_id = useRef();
  const [shape, setshape] = useState([]);
  const [col, setcol] = useState([]);
  const x_ref = useRef(null);
  const y_ref = useRef(null);

  const colors = ["#6C63FF", "#FF6584", "#4CAF50", "#2196F3", "#FFC107"];

  return (
    <div
      style={{
        background: "#f9fafc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
      }}
    >
      <button
        style={{
          background: "#6C63FF",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          alignSelf: "flex-start",
          fontWeight: "600",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        onClick={() => {
          const name = prompt("Enter table name:");
          if (!name) return;
          const color = colors[table_count % colors.length];
          setshape((prev) => [
            ...prev,
            {
              type: "table",
              fill: color,
              id: "t" + table_count++,
              height: 200,
              width: 200,
              x: 80,
              y: 80 + prev.length * 240,
              name,
            },
          ]);
        }}
      >
        + Add Table
      </button>

      <svg
        height={1600}
        width={1600}
        style={{ border: "1px solid #ddd", background: "#fdfdfd" }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
            fill="#555"
          >
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#ddd"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#ccc"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {shape.map((item, index) => (
          <g key={index}>
            <rect
              onMouseDown={async (e) => {
                await tablespec(e.target.id, shape, x_ref, y_ref);
                table_id.current = e.target.id;
                setactive("dropdown");
              }}
              fill={item.fill}
              x={item.x}
              y={item.y}
              height={item.height}
              width={item.width}
              rx="12"
              ry="12"
              id={item.id}
              style={{
                stroke: "#333",
                strokeWidth: "1.5",
                filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.15))",
                cursor: "pointer",
              }}
            ></rect>
            <text
              x={item.x + item.width / 2}
              y={item.y + 28}
              fill="white"
              textAnchor="middle"
              fontSize="16"
              fontWeight="600"
              style={{ pointerEvents: "none" }}
            >
              {item.name}
            </text>
          </g>
        ))}

        {active === "dropdown" && (
          <SvgDropdown
            setactive={setactive}
            setshape={setshape}
            options={["Add Attribute", "Delete Table", "Rename"]}
          />
        )}

        {col.map((item, index) => (
          <g key={index}>
            <ellipse
              fill="#fff"
              stroke="#444"
              strokeWidth="1.2"
              id={item.id}
              t_id={item.table_id}
              cx={item.cx}
              cy={item.cy}
              rx={28}
              ry={20}
              style={{
                filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.1))",
                cursor: "pointer",
              }}
            ></ellipse>
            <text
              x={item.cx}
              y={item.cy}
              fill="#333"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="13"
              fontWeight="500"
              style={{ pointerEvents: "none" }}
            >
              {item.title}
            </text>
          </g>
        ))}
      </svg>

      {active === "Modal" && (
        <ModalInput
          setcol={setcol}
          table_id={table_id}
          x_ref={x_ref}
          y_ref={y_ref}
          setactive={setactive}
        />
      )}
      <Apply shape={shape} col={col}></Apply>
    </div>
  );
}

export default App;
