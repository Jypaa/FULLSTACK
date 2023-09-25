const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  const Header = (prop) => {
    console.log(prop)
    return (
      <div className="header">
        <h1>{prop.course.name}</h1>
      </div>
    );
  }

  const Content = (prop) => {
  console.log(prop)
  return (
    <div className="content">
      <p>{prop.course.parts[0].name} {prop.course.parts[0].exercises}</p>
      <p>{prop.course.parts[1].name} {prop.course.parts[1].exercises}</p>
      <p>{prop.course.parts[2].name} {prop.course.parts[2].exercises}</p>
    </div>
    )  
  }
  const Part = (prop) => {
    return (
      <div className="part">
        <p>{prop.part} {prop.exercises}</p>
      </div>
    )
  }

  const Total = (prop) => {
    return (
      <div className="total">
       <p>Number of exercises {prop.course.parts[0].exercises + prop.course.parts[1].exercises + prop.course.parts[2].exercises} </p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App