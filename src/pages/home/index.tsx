import React , { Component } from "React"
import { Navigation } from "src/utils"

class Home extends Component {
	componentDidMount(){
		Navigation.push()
	}
	public render(){
		return <div>home</div>
	}
}

export default Home