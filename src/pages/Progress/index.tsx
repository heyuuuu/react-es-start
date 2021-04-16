import React from "react"
import { Timeline } from "antd"
import { DataSql } from "src/utils"
import "./index.less"
import { RouteProps } from "react-router"
import Moment from "moment"

interface ItemProps {
	id: number
	uid: string
	time?: number
	model: "test" | "formal"
	title: string
	outmoded: boolean
}

interface State {
	list: Array<ItemProps>
}

export default class Progress extends React.Component<RouteProps, State>{
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}
	componentDidMount() {
		const now = Moment().format("YYYY-MM-DD")
		DataSql.GetData("task").then(res => {
			let list: Array<ItemProps> = []
			res.map(item => {
				if(item.testTime && !item.status){
					list.push({
						uid: `test-${item.id}`,
						id: item.id,
						title: item.title,
						time: item.testTime,
						model: "test",
						outmoded: Moment(item.testTime).isBefore(now)
					})
				}
				if(item.formalTime && !item.status){
					list.push({
						id: item.id,
						uid: `formal-${item.id}`,
						title: item.title,
						time: item.formalTime,
						model: "formal",
						outmoded: Moment(item.formalTime).isBefore(now)
					})
				}
			})
			list = list.sort((prve, next) => prve.time - next.time)
			this.setState({list})
		})
	}
	render() {
		const formatime = time => Moment(time).format("YYYY-MM-DD")
		const transStatus = (model, outmoded) => {
			if(model === "test") {
				return outmoded ? "gray" : "green"
			}
			if(model === "formal"){
				return outmoded ? "red" : "green"
			}
		}
		const { list } = this.state
		return <>
			<div className="m-t-large progress-container">
				<Timeline mode="alternate">
					{
						list.map(item => <Timeline.Item 
							position={item.model === "formal" ? "left" : "right"} 
							key={item.uid} 
							label={formatime(item.time)} 
							color={transStatus(item.model, item.outmoded)}>
							{item.title} - [{item.model === "test" ? "提测" : "发版"}]
						</Timeline.Item>)
					}
				</Timeline>
			</div>
		</>
	}
}