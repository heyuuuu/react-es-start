import React from "react"
import { Timeline } from "antd"

export default class Progress extends React.Component{
	render() {
		return <>
			<Timeline>
				<Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
				<Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
				<Timeline.Item>Technical testing</Timeline.Item>
				<Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
			</Timeline>
		</>
	}
}