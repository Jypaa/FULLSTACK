const Content =(props)=>{
    console.log("Parts" ,props);
     
return(
    <ul>
        {
            props.course.parts.map(part =><li key={part.id}> { part.name + " " + part.exercises}</li>)
        }
  </ul>
)
  }

export default Content