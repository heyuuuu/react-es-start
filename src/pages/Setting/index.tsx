import React from 'react'
import { Menu } from 'antd'
import Developer from './Developer'
import Producter from "./Producter"
import Subject from "./Subject"
import "./index.less"

interface SettingState {
    current: "developer" | "producter" | "subject"
}

export default class Setting extends React.Component {
    state: SettingState
    constructor(props){
        super(props)
        this.state = {
            current: "developer"
        }
        this.tabMenu = this.tabMenu.bind(this)
    }
    tabMenu(ev){
        this.setState({ current: ev.key })
    }
    render(){
        const { current } = this.state
        return <div className="setting-container">
            <Menu className="setting-headbar" selectedKeys={[current]} mode="horizontal" onClick={this.tabMenu}>
                <Menu.Item key="developer">
                    开发者
                </Menu.Item>
                <Menu.Item key="producter">
                    产品经理
                </Menu.Item>
                <Menu.Item key="subject">
                    项目列表
                </Menu.Item>
            </Menu>
            <div>
                { current === "developer" && <Developer />}
                { current === "producter" && <Producter />}
                { current === "subject" && <Subject />}
            </div>
        </div>
    }
}