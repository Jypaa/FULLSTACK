import Content from "./Content"

const Course = (props) => {
    
      console.log("Main",props.course.course)
    
      return (
        <div>
          <h1>Web development curriculum</h1>
          <Content course={props.course.course[0]} />
          <Content course={props.course.course[1]} />
        </div>
      )
}
export default Course;
