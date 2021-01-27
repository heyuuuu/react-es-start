import React, { Suspense } from 'react'
import { Provider } from "react-redux"
import { Route, Switch, Router  } from "react-router-dom"
import ReactDOM from 'react-dom'
import { createHashHistory } from "history"
import { InjectNavModel } from "react-router-nav"
import { Loading } from "src/components"
import Routes from "./routes"
import Store from "src/store"

const RouteModel = createHashHistory()

InjectNavModel(RouteModel,Routes)

class App extends React.Component {
	render() {
		return <Provider store={Store}>
			<Router history={RouteModel}>
				<Suspense fallback={<Loading />}>
					<Switch>
						{
							Routes.map(item => <Route key={item.name} path={item.path} component={item.component} />)
						}
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	}
}

ReactDOM.render(<App />, document.querySelector("#app"))