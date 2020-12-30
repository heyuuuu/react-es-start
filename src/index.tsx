import React, { Suspense } from 'react'
import { Route, Switch, Router  } from "react-router-dom"
import ReactDOM from 'react-dom'
import { Loading } from "src/components"
import { H , Routes} from "src/utils/Navigation"
class App extends React.Component {
	render() {
		return <div>
			<Router history={H}>
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