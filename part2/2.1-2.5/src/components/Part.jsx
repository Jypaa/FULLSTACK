const Part =(props)=>{
    console.log("Parts" ,props.parts);
     
return(
    <ul>
        {
            props.parts.map(part =><li key={part.id}> { part.name + " " + part.exercises}</li>)
        }
  </ul>
)
  }

export default Part
