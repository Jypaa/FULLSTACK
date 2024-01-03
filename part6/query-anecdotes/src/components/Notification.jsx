const Notification = (props) => {
  console.log('props', props)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }



  return (
    <div style={style}>
      {props.value}
    </div>
  )
}

export default Notification

