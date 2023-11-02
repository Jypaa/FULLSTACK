const Persons = ({value, poistettava, text}) => {
    return (
      <li>
        {value.name} {value.number}{<button type='button' onClick={poistettava}>{text}</button>}
        </li>
    )
  }

  export default Persons