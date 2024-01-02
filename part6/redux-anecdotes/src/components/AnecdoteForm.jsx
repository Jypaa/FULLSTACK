import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch({
          type: 'NEW_ANECDOTE',
          data: {
            content: event.target.anecdote.value,
          }
        })
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm