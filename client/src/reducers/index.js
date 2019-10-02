
import { combineReducers } from 'redux'
import authReducer from './auhtReducer'

export default combineReducers({
  auth: authReducer
})