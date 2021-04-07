import React from "react"
import { Table , Button , Modal } from "antd"
import { DataSql , Tools } from "src/utils"
import { Task , Action , WrapSwitch } from "./components"
import Moment from "moment"
import "./index.less"

const { Column } = Table

class Manager extends React.Component<OBJ,any>{
    private child: any
    private GetSubject: Promise<Array<DataSql.Subject>>
    private GetDeveloper: Promise<Array<DataSql.Developer>>
    constructor(props: OBJ){
        super(props)
        this.state = {
            list: []
        }
        this.task = this.task.bind(this)
        this.updata = this.updata.bind(this)
        this.delTask = this.delTask.bind(this)
        this.GetSubject = DataSql.GetData(DataSql.DB_TABLE_SUBJECT)
        this.GetDeveloper = DataSql.GetData(DataSql.DB_TABLE_DEVELOPER)
    }
    task(id?: number){
        this.child.visible(id)
    }
    updata(){
        this.GetList()
    }
    delTask(id){
        Modal.confirm({
            title: "警告",
            content: "是否要删除该任务?",
            okText: '确认',
            cancelText: '取消',
            onOk:() => {
                DataSql.Delete("task",id).then(() => this.GetList())
            }
        })
    }
    GetList(){
        DataSql.GetData("task").then(res => {
            this.GetSubject.then(subject => {
                res.map((item: any) => {
                    item.key = item.id
                    item.subject = Tools.query(subject,'id',item.subject)[0]?.name
                })
                return res
            }).then(res => {
                this.GetDeveloper.then(developer => {
                    res.map((item: any) => {
                        item.developer = Tools.query(developer,'id',item.developer).map(item => item.name).join('、')
                        item.testTime = item.testTime ? Moment(item.testTime).format('YYYY-MM-DD') : ""
                        item.formalTime = item.formalTime ? Moment(item.formalTime).format('YYYY-MM-DD') : ""
                    })
                    this.setState({list: res})
                })
            })
        })
    }
    componentDidMount(){
        this.GetList()
    }
    render(){
        const { list } = this.state
        return <div className="manager-container">
            <div className="manager-headbar">
                <Button type="primary" onClick={() => this.task()}>新增任务</Button>
            </div>
            <Table dataSource={list} pagination={false}>
                <Column title="项目名称" dataIndex="subject" key="subject" />
                <Column title="迭代目标" dataIndex="title" key="title" />
                <Column title="开发者" dataIndex="developer" key="developer" />
                <Column title="提测时间" dataIndex="testTime" key="testTime" />
                <Column title="发版时间" dataIndex="formalTime" key="formalTime" />
                <Column title="备注" dataIndex="comment" key="comment" />
                <Column title="完成状态" dataIndex="" key="status" render={WrapSwitch} />
                <Column
                    title="操作"
                    dataIndex=""
                    key="action"
                    render={(text, record: any) => <Action id={record.id} onEidt={this.task} onDel={this.delTask} />}
                    />
            </Table>
            <Task onRef={methods => this.child = methods} onComplete={this.updata} />
        </div>
    }
}

export default Manager