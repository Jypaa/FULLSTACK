import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'

const ADD_BORN_YEAR = gql`
  mutation editAuthor($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ){
      name
      born
    }
  }
`

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [bornYear, setBornYear] = useState('');
  const [addBornYear] = useMutation(ADD_BORN_YEAR)

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };
  if (!props.show) {
    return null
  }
  const authors = props.authors

  const handleSubmit = (event) => {
    event.preventDefault();
    addBornYear({ variables: { name: selectedAuthor, born: parseInt(bornYear,10) } })
    setSelectedAuthor('');
    setBornYear('');
  }
  
  const handleBornYearInputChange = (event) => {
    setBornYear(event.target.value);
  };

  if(!props.token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  else{
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <label>
      <h2>Set Born Year</h2>
        <select value={selectedAuthor} onChange={handleAuthorChange}>
          <option value="" disabled>Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <label>
          
        <input type="number" value={bornYear} onChange={handleBornYearInputChange} />
        <button onClick={handleSubmit}>Select</button>
      </label>
      </label>
    </div>
  )
          }
}

export default Authors
