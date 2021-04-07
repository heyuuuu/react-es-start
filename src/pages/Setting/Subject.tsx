import React, { useState , createRef } from 'react'
import { DataSql } from "src/utils"
import { List , Input , Button , Modal } from 'antd'

interface SubjectState {
    list: Array<DataSql.Subject>
}

interface ItemProps extends DataSql.Subject {
    callback: FUNC
}

function Item(props: ItemProps){
    const [name,setName] = useState(() => props.name)
    function onChange(event){
        setName(event.target.value)
    }
    function save(){
        DataSql.Update(DataSql.DB_TABLE_SUBJECT,{id: props.id,name}).then(props.callback)
    }
    function del(){
        Modal.confirm({
            title: "警告",
            content: `确定要删除"${name}"`,
            cancelText: "取消",
            okText: "删除",
            onOk: () => {
                DataSql.Delete(DataSql.DB_TABLE_SUBJECT,props.id).then(props.callback)
            }
        })
    }
    return <List.Item>
        <div className="flex-full">
            <Input defaultValue={props.name} onChange={onChange} />
        </div>
        <div className="setting-action">
            <Button type="primary" disabled={name == props.name} onClick={save}>保存</Button>
            <Button type="primary" danger style={{marginLeft: "15px"}} onClick={del}>删除</Button>
        </div>
    </List.Item>
}

export default class Subject extends React.Component {
    state: SubjectState
    additionRef = createRef<Input>()
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
        this.GetList = this.GetList.bind(this)
        this.addition = this.addition.bind(this)
    }
    GetList(){
        return DataSql.GetData(DataSql.DB_TABLE_SUBJECT).then(res => this.setState({list: res}))
    }
    addition(){
        const name = this.additionRef.current.input.value
        DataSql
            .Write(DataSql.DB_TABLE_SUBJECT,{name})
            .then(this.GetList)
            .then(() =>  this.additionRef.current.setValue(""))
    }
    componentDidMount(){
        this.GetList()
    }
    render(){
        const { list } = this.state
        return <>
            <List>
                <List.Item className="flex">
                    <div className="flex-full">项目列表</div>
                    <span className="setting-action">操作</span>
                </List.Item>
                {
                    list.map(item => <Item key={item.id} {...item} callback={this.GetList} />)
                }
                <List.Item>
                    <div className="flex-full">
                        <Input ref={this.additionRef} defaultValue="" />
                    </div>
                    <div className="setting-action">
                        <Button type="primary" onClick={this.addition}>新增</Button>
                    </div>
                </List.Item>
            </List>
        </>
    }
}