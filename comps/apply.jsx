

const Apply = ({ shape, col }) => {
    const Queryarray=[]
  async function TableQ() {
    console.log(shape,col);
    for (let i = 0; i < shape.length; i++) {
        console.log(shape[i].id,shape[i].name)
      const res=await AttrQ(shape[i].name, shape[i].id);
      Queryarray.push(res);
    }
    const res = await fetch("http://localhost:3000/db-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: Queryarray }),
      });
  }
  async function AttrQ(title, table_id) {
    const attributes = col.filter((s) => s.t_id === table_id);
    console.log(attributes);
    if (attributes.length === 0) return;

    let query = `CREATE TABLE ${title} (`;
    attributes.forEach((element, idx) => {
      query += `${element.title} ${element.type}`;
      if (idx < attributes.length - 1) query += ", ";
    });
    query += ");";
    return query;
  }


  return (
    <>
      <button onClick={()=>{TableQ()}}>Apply changes in DB</button>
    </>
  );
};

export default Apply;
