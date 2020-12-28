import React , { Component } from "React"
import { Navigation } from "src/utils"

class Home extends Component {
	componentDidMount(){
		Navigation.CreateFullPath('homes',{id: 3},{modal: "5"})
	}
	public render(){
		return <div>home</div>
	}
}

export default Home