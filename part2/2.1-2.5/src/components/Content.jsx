import Header from './Header'
import Total from './Total'
import Part from './Part'

const Content = (props) => {
  
console.log("Content",props)
  return ( 
    <div>
      <Header header = {props.course}/>
      <Part parts ={props.course.parts}/>
      <Total total ={props.course.parts}/>
    </div>
  )
}

export default Content