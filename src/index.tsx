import React, { Suspense } from 'react'
import { Provider } from "react-redux"
import { Route, Switch, Router  } from "react-router-dom"
import ReactDOM from 'react-dom'
import { createBrowserHistory } from "history"
import { InjectNavModel } from "react-router-nav"
import { Loading , WrapMenu } from "src/components"
import Routes from "./routes"
import Store from "src/store"
import "./common.less"
import "antd/dist/antd.css"

const RouteModel = createBrowserHistory()

InjectNavModel(RouteModel,Routes)

class App extends React.Component {
	render() {
		return <Provider store={Store}>
			<Router history={RouteModel}>
				<div className="flex">
					<WrapMenu />
					<div className="flex-full">
						<Suspense fallback={<Loading />}>
							<Switch>
								{
									Routes.map(item => {
										const {name,...props} = item
										return <Route key={name} {...props}/>
									})
								}
							</Switch>
						</Suspense>
					</div>
				</div>

			</Router>
		</Provider>
	}
}

ReactDOM.render(<App />, document.querySelector("#app"))