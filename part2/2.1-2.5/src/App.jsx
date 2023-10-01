import Course from './components/Course'

const App = (props) => {
  console.log(props)

  return (
    <div>
      <Course course={props}/>
    </div>
  )
}

export default App