import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { voteAnecdotes } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        const filter = state.filter;
        if (filter === '') {
          return state.anecdotes.slice().sort((a, b) => b.votes - a.votes);
        } else {
          return state.anecdotes
            .filter((anecdote) =>
              anecdote.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes);
        }
      });
      const dispatch = useDispatch()
    
      const vote = (id, content) => {
        dispatch(voteAnecdotes(id))
        dispatch(setNotification(`Voted for anecdote: ${content}`,10));

      }

      return(
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
      </div>
      )
}

export default AnecdoteList;