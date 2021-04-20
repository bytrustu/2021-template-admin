import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { counterSlice } from '../reducers/counterSlice'

const rootReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload
    default: {
      const combineReducer = combineReducers({
        [counterSlice.name]: counterSlice.reducer,
      })
      return combineReducer(state, action)
    }
  }
}

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
