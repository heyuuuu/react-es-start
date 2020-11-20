import React , { Suspense } from 'react';
import ReactDOM from 'react-dom'
import { Modal } from "src/components"

function Loading (){
	return <div>xxxxx</div>
}

class App extends React.Component {
  render() {
		return <div>
			<Suspense fallback={<div>xxxxxsss</div>}>
				<Loading />
				<Modal />
			</Suspense>
		</div>
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))