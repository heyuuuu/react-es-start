
import React from "react"
import { Route, Switch } from "react-router-dom"
import { WrapMenu } from "src/components"
import R from "src/routes"

export default class Home extends React.Component{
	render() {
		return <div className="flex">
			<WrapMenu />
			<div className="flex-full">
				<Switch>
					{
						R.List.map(item => {
							const {name, ...props} = item
							return <Route key={name} {...props}/>
						})
					}
				</Switch>
			</div>
		</div>
	}
}