import React , { Component } from "react"
import Modal from "../Modal"
import style from "./index.less"

class Loading extends Component {
	render(){
		return <Modal show><div className={style.icon} /></Modal>
	}
}

export default Loading