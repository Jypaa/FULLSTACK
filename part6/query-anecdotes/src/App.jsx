import AnecdoteForm from './components/AnecdoteForm'
import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdotes } from './requests'
import Notification from './components/Notification'
import NotificationContext from './components/NotificationContext'


export const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        console.log('state now2: ', state)
        return action.data
      case 'CLEAR':
        return ''
      default:
        return state
    }
  }


const App = () => {
  const [notification, notificationdispatch] = useReducer(notificationReducer, '')
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
    notificationdispatch({type: 'SET', data: `you voted ${anecdote.content}`})
    setTimeout(() => {
      notificationdispatch({ type: 'CLEAR' });
    }, 5000);
  }


  return (
    <div>
     <NotificationContext.Provider value={[notification, notificationdispatch]}> 
      <h3>Anecdote app</h3>
    
      <Notification value={notification}/>

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
      </NotificationContext.Provider>
    </div>
  )
}

export default App
