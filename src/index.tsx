import React, { Suspense } from 'react'
import { Route, Switch, Router } from "react-router-dom"
import ReactDOM from 'react-dom'
import { Loading } from "src/components"
import Routes from "src/routes"
import { createHashHistory } from "history"
import { NavigationInject } from "src/utils/Navigation"

const HistoryLib = createHashHistory()

NavigationInject(HistoryLib, Routes)
class App extends React.Component {
	render() {
		return <div>
			<Router history={HistoryLib}>
				<Suspense fallback={<Loading />}>
					<Switch>
						{
							Routes.map(item => <Route key={item.name} path={item.path} component={item.component} />)
						}
					</Switch>
				</Suspense>
			</Router>
		</div>
	}
}

ReactDOM.render(<App />, document.querySelector("#app"))