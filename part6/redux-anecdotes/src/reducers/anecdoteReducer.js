import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers:{
    voteAnecdote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action){
      console.log('action.payload', action.payload)
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    putAnecdote(state, action){
      const id = action.payload.id
      const indexToRemove = state.findIndex(anecdote => anecdote.id === id);
      state.splice(indexToRemove, 1)
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, putAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdotes = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const changedAnecdote = { 
      ...anecdoteToVote, 
      votes: anecdoteToVote.votes + 1 
    }
    console.log('changedAnecdote', changedAnecdote)
    const updateAnecdote = await anecdoteService.update(id, changedAnecdote) 
    dispatch(putAnecdote(updateAnecdote))
  }
}

export default anecdoteSlice.reducer