import React, { Suspense } from "react"
import { Provider } from "react-redux"
import { Route, Switch, Router, Redirect  } from "react-router-dom"
import ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { InjectNavModel } from "react-router-nav"
import { Loading } from "src/components"
import R from "./routes"
import Store from "src/store"
import "./common.less"
import "antd/dist/antd.css"

const RouteModel = createBrowserHistory()

InjectNavModel(RouteModel)

class App extends React.Component{
	render() {
		return <Provider store={Store}>
			<Router history={RouteModel}>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route {...R.Login} />
						<Route {...R.Error} />
						<Route {...R.Home} exact />
						<Redirect from="*" to="/error" />
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	}
}

ReactDOM.render(<App />, document.querySelector("#app"))