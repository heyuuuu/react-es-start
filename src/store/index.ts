import { combineReducers , createStore } from "redux"

const reducer = combineReducers({
	userInfo: function(state = {} , action: OBJ ){
		console.log("userInfo",state,action)
		return state
	},
	token: function(state = {} , action: OBJ ){
		console.log("token",state,action)
		return state
	}
})

const store = createStore(reducer)

export default store