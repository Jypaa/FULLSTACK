import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from './requests'
import { getAnecdotes, updateAnecdotes } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if( result.isError ) {
    return <div>anecdote service not avaible due problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('anecdote to vote', anecdote)
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    console.log('new anecdote', newAnecdote)
    newAnecdoteMutation.mutate(newAnecdote)

  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App