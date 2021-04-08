import React, { useState , createRef , useMemo } from 'react'
import { DataSql , Hooks } from "src/utils"
import { List , Input , Button , Modal } from 'antd'

interface SubjectState {
    list: Array<DataSql.Subject>
}

interface ItemProps extends DataSql.Subject {
    callback: FUNC
}

function Item(props: ItemProps){
    const FormInstance = useMemo(() => Hooks.useForm<ItemProps>(props),[props])
    const [pass,setPass] = useState(true)
    FormInstance.onChange((data,initData) => {
        const pass = data.name == initData.name && data.domain == initData.domain && data.git == initData.git
        setPass(pass)
    })
    function save(){
        FormInstance.files.id = props.id
        DataSql.Update(DataSql.DB_TABLE_SUBJECT,FormInstance.files).then(props.callback)
    }
    function del(){
        Modal.confirm({
            title: "警告",
            content: `确定要删除"${props.name}"`,
            cancelText: "取消",
            okText: "删除",
            onOk: () => {
                DataSql.Delete(DataSql.DB_TABLE_SUBJECT,props.id).then(props.callback)
            }
        })
    }
    return <List.Item>
        <div className="flex-full">
            <Input defaultValue={props.name} ref={FormInstance.insertAntdInput} name="name" />
        </div>
        <div className="flex-full m-l-small">
            <Input defaultValue={props.domain} ref={FormInstance.insertAntdInput} name="domain" />
        </div>
        <div className="flex-full m-l-small">
            <Input defaultValue={props.git} ref={FormInstance.insertAntdInput} name="git" />
        </div>
        <div className="setting-action">
            <Button type="primary" disabled={pass} onClick={save}>保存</Button>
            <Button type="primary" className="m-l-large" danger onClick={del}>删除</Button>
        </div>
    </List.Item>
}

const WrapItem = React.memo(Item)

export default class Subject extends React.Component {
    state: SubjectState
    additionRef = createRef<Input>()
    additionForm = Hooks.useForm({name: ""})
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
        this.GetList = this.GetList.bind(this)
        this.addition = this.addition.bind(this)
    }
    GetList(){
        DataSql.GetData(DataSql.DB_TABLE_SUBJECT).then(console.log)
        return DataSql.GetData(DataSql.DB_TABLE_SUBJECT).then(res => this.setState({list: res}))
    }
    addition(){
        const { name , git , domain } = this.additionForm.files
        DataSql
            .Write(DataSql.DB_TABLE_SUBJECT,{name,git,domain})
            .then(this.GetList)
            .then(() =>  this.additionForm.reset())
    }
    componentDidMount(){
        this.GetList()
        // this.additionForm.initDefauleValue({})
    }
    render(){
        const { list } = this.state
        return <>
            <List>
                <List.Item className="flex">
                    <div className="flex-full">项目名称</div>
                    <div className="flex-full m-l-small">正式域名</div>
                    <div className="flex-full m-l-small">GIT地址</div>
                    <span className="setting-action">操作</span>
                </List.Item>
                {
                    list.map(item => <WrapItem key={item.id} {...item} callback={this.GetList} />)
                }
                <List.Item>
                    <div className="flex-full">
                        <Input ref={this.additionForm.insertAntdInput} name="name" />
                    </div>
                    <div className="flex-full m-l-small">
                        <Input ref={this.additionForm.insertAntdInput} name="domain" />
                    </div>
                    <div className="flex-full m-l-small">
                        <Input ref={this.additionForm.insertAntdInput} name="git" />
                    </div>
                    <div className="setting-action">
                        <Button type="primary" onClick={this.addition}>新增</Button>
                    </div>
                </List.Item>
            </List>
        </>
    }
}