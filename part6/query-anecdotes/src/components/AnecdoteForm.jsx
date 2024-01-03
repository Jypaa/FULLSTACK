import { getAnecdotes, createAnecdotes } from '../requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const AnecdoteForm = () => {
  const [notification, notificationdispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    onError: (error) => {
      notificationdispatch({type: 'SET', data: `too short, must have length greater than 5 `})
      setTimeout(() => {
        notificationdispatch({ type: 'CLEAR' });
      }, 5000);
    }
  })
  
  const onCreate = async (event) => {
    event.preventDefault()
    console.log('create new anecdote', event.target.anecdote.value)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate( {content, votes: 0})
    notificationdispatch({type: 'SET', data: `you created ${content}`})
    setTimeout(() => {
      notificationdispatch({ type: 'CLEAR' });
    }, 5000);   
  }

  return (   
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
