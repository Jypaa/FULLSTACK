import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers:{
        filterAnecdotes(state, action){
            return action.payload
        }
    }
    })

  export const setFilter = (filter) => {
    return {
      type: 'SET_FILTER',
      data: { filter }
    }
  }
  export const { filterAnecdotes } = filterSlice.actions
  export default filterSlice.reducer
  