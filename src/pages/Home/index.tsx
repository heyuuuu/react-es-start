
import React from "react"
import { Route, Switch } from "react-router-dom"
import Menu from "./components/Menu"
import RouteConfig from "src/routes"

export default class Home extends React.Component{
	render() {
		return <div className="flex">
			<Menu />
			<div className="flex-full">
				<Switch>
					{
						RouteConfig.List.map(item => {
							const {name, ...props} = item
							return <Route key={name} {...props}/>
						})
					}
				</Switch>
			</div>
		</div>
	}
}