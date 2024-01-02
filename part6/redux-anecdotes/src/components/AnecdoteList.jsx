import { useSelector, useDispatch } from 'react-redux'

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
    
      const vote = (id) => {
        dispatch({     
          type: 'VOTE',
          data: { id }
        })
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
      </div>
      )
}

export default AnecdoteList;