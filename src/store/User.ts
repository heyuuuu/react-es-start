const initState = null

function User(state = initState, { type, data }) {
	if(type === "UserInfo"){
		state = data
	}
	return state
}

export default User