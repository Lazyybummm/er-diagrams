async function tablespec(id,shape,x_ref,y_ref){
    console.log(id);
    const found=shape.find(s=>s.id==id)
    console.log(found.y);
    x_ref.current=found.x+found.width+20;
    y_ref.current=found.y;
}


export default tablespec;