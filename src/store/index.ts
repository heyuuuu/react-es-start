import { createStore, combineReducers } from "redux"

import user from "./User"

const reducers = combineReducers({user})

export default createStore(reducers)