import { useState } from 'react'
import * as React from 'react';


const Staticstic = (props) => {
  console.log(props)
  let all = props.total.good + props.total.neutral + props.total.bad;
  let average = ((1 * props.total.good - (1 * props.total.bad )) /(props.total.good + props.total.neutral + props.total.bad));
  let positive = props.total.good/ (props.total.good + props.total.neutral + props.total.bad) * 100 ;

  return(
      <tbody>
        <StatisticLine value={props.total.good} text="good"/>
        <StatisticLine value={props.total.neutral} text="neutral"/>
        <StatisticLine value={props.total.bad} text="bad"/>
        <StatisticLine value={all} text="all" />
        <StatisticLine value={average} text="average"/>
        <StatisticLine value={positive} text="positive %"/>
      </tbody>
  )
}

  const StatisticLine=(props)=>{
    console.log(props)
    
    return( 
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>   
    ) 
  }

const Button = (props)  => (
 
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Tila=(props) => {
  let good = props.tila.good
  let neutral = props.tila.neutral
  let bad = props.tila.bad
  console.log(props)
  if(good === 0 && neutral=== 0 && bad === 0){
    return(
      <div>
        "No feedback yet"
      </div>
    )
  }else{
    return(
      <div>
        <Staticstic total={({good,neutral,bad})}/> 
      </div>
        )
    }
}

const App = () => {
  
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => { 
    setGood(good +1)
  }

  const setToNeutral = () => {    
    setNeutral(neutral +1)
  }

  const setToBad = () => {
    setBad(bad +1)
  }
  

  return (
    <div>
      
      <h1>give feedback</h1>
      
      <Button handleClick={() => setToGood()} text="good" />
      <Button handleClick={() => setToNeutral()} text="neutral" />
      <Button handleClick={() => setToBad()} text="bad" />

      <h1>Statistics</h1> 

      <Tila tila={({good,neutral,bad})}/>

    </div>
  )
}
export default App