import React from "react";

const SvgDropdown = ({ x, y, options = [], onChange,setactive }) => {
  return (
    <foreignObject x={x} y={y} width={120} height={40}>
      <div xmlns="http://www.w3.org/1999/xhtml">
        <select
          defaultValue="" // 👈 ensures nothing selected at first
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "6px",
            padding: "4px",
            fontSize: "14px",
          }}
          onChange={(e) => { if(e.target.value=="Add Attribute"){
            setactive('Modal')
          }
          else if(e.target.value=='Rename'){
            setactive('renm');
          }
          else{
            setactive('delt')
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
