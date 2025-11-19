import { useState } from "react";
import axios from "axios";

function Landing({ setactive, setshape, setcol, idref ,nameref}) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  async function check() {
    if (!name || !id) {
      console.log("Name or ID missing!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/state-request", {
        name,
        id,
      });

      if (response.data) {
        setshape(response.data.schema_data.shape);
        setcol(response.data.schema_data.col);

        idref.current=id
        nameref.current=name
        

        setactive("selected");
      }
    } catch (err) {
      console.error("Error fetching schema:", err);
    }
  }

  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID"
      />
      <button onClick={check}>Submit</button>
    </>
  );
}

export default Landing;
