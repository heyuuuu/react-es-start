import React , { Component } from "react"
import cn from "classnames"
import style from "./index.less"

interface IProps {
	onClickMask?(event: React.MouseEvent): void
	maskClass?: string
	containerClass?: string
	show?: boolean
}

class Modal extends Component<IProps> {
	public clickMask(e: React.MouseEvent){
		const { onClickMask } = this.props
		e.preventDefault()
		onClickMask instanceof Function && onClickMask(e)
	}
	render(){
		const { children , maskClass = "" , containerClass = "" , show } = this.props
		return <div className={cn(style.mask,maskClass,{[style.show]: show})} onClick={e => this.clickMask(e)}>
			<div 
				className={cn(style.container,containerClass)} 
				onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	}
}

export default Modal