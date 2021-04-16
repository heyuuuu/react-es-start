
import React from "react"
import { Route, Switch, Redirect, RouteProps } from "react-router-dom"
import Menu from "./components/Menu"
import routes from "./routes"
// import router from "react-router-nav"

export default class Home extends React.Component<RouteProps>{
	componentDidMount() {
		// router.replace("login")
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(prevProps, prevState, snapshot)
	}
	render() {
		return <div className="flex">
			<Menu key={this.props.location.pathname} />
			<div className="flex-full">
				<Switch>
					<Redirect from="/" to="/manager" exact />
					{
						routes.map(item => {
							const {name, ...props} = item
							return <Route key={name} {...props}/>
						})
					}
					<Redirect from="*" to="/error" />
				</Switch>
			</div>
		</div>
	}
}