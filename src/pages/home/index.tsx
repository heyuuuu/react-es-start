import React , { Component } from "React"
import { Route , RouteChildrenProps } from "react-router-dom"
// import { Navigation } from "src/utils"

// 单例模式
function Singleton(){
	return <div>单例模式</div>
}

class Home extends Component<RouteChildrenProps> {
	componentDidMount(){
		console.log
	}
	public render(){
		const { match } = this.props
		return <div>设计模式
			<div>
				<Route path={match.path + "/singleton"} component={Singleton} />
			</div>
		</div>
	}
}

export default Home