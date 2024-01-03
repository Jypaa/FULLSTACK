import { createNewAnecdote  } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnecdote(content))
        dispatch(setNotification(`Created new anecdote: ${content}`,10));
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