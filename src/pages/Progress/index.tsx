import React from "react"
import { Timeline } from "antd"
import { DataSql } from "src/utils"
// import Store from "src/store"

export default class Progress extends React.Component{
	componentDidMount() {
		DataSql.GetData("task").then(console.log)
	}
	test() {
		// console.log(Middleware.getState())
		// Middleware.dispatch({type: "HEYU", data: []})
	}
	render() {
		return <>
			<Timeline>
				<Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
				<Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
				<Timeline.Item><span onClick={() => this.test()}>===Technical testing===</span></Timeline.Item>
				<Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
			</Timeline>
		</>
	}
}