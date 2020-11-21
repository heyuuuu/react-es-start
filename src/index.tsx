import React , { Suspense } from 'react'
import { Route , Switch , BrowserRouter as Router } from "react-router-dom"
import ReactDOM from 'react-dom'
import { Loading } from "src/components"
import Routes from "src/routes"

class App extends React.Component {
  render() {
		return <div>
			<Router>
				<Suspense fallback={<Loading />}>
						<Switch>
							{
								Routes.map( item => <Route key={item.name} path={item.path} component={item.component} />)
							}
						</Switch>
				</Suspense>
			</Router>
		</div>
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))