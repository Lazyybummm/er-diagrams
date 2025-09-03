
import { useRef } from "react";


let attr_count = 0;
const rx = 20;
const ry = 20;

const offsets=[{}];
function sync(table_id){
    const res=offsets.find((s)=>{s.tidd==table_id})
    return res.gap;

}
const ModalInput = ({ setcol, x_ref, y_ref, table_id, setactive,wsref,offsetref }) => {
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
        <input ref={input1ref} type="text" placeholder="name of attribute" />
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
            wsref.current.send(JSON.stringify({type:'offset-request',id:table_id.current}))
            setcol((prev) => {
               const next= [
              ...prev,
              { type:'attribute',
                id: "a" + attr_count++,
                title: input1ref.current.value,
                type: input2ref.current.value,
                cx: x_ref.current,
                cy: y_ref.current + offsetref.current,
                t_id: table_id.current,
              },
            ]
           
            wsref.current.send(JSON.stringify({type:"attribute",payload:next}))
            return next;
          });
          }}
        >
          CREATE ATTRIBUTE
        </button>
      </div>
    </div>
  );
};

export default ModalInput;
