import React from "react";

const Total = (props) =>{
    console.log("Total",props)
    return(
      <div> 
        <h4>total of {props.total.reduce(
        (prevValue, currentValue) => prevValue + currentValue.exercises,0)} exercises</h4>
      </div>
    )
  }

  export default Total