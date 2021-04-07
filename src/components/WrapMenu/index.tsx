import React from "react"
import { Menu } from 'antd'
import { withRouter , RouteComponentProps } from "react-router-dom"
import Router from "react-router-nav"
import "./index.less"

interface WrapMenuState {
    defauleKey: string
}

class WrapMenu extends React.Component<RouteComponentProps,WrapMenuState> {
    constructor(props: RouteComponentProps){
        super(props)
        const name = Router.GetNameFromPath(this.props.history.location.pathname)
        this.tab = this.tab.bind(this)
        this.state = {
            defauleKey: name
        }
    }
    tab(ev){
        Router.push(ev.key)
    }
    render(){
        const { defauleKey } = this.state
        return <div className="wrapmenu-container">
            <Menu theme="light" defaultSelectedKeys={[defauleKey]} mode="inline" onClick={this.tab}>
                <Menu.Item key="home">
                    项目管理
                </Menu.Item>
                <Menu.Item key="setting">
                    参数设置
                </Menu.Item>
                <Menu.Item key="progress">
                    进度把控
                </Menu.Item>
            </Menu>
        </div>
    }
}

export default withRouter(WrapMenu)