import React , { useState , useEffect } from 'react'
import { Form, Input, Modal , Select , DatePicker } from 'antd'
import { DataSql } from "src/utils"
import moment from 'moment'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/date-picker/locale/zh_CN'
const { Option } = Select

interface IProps {
    onRef: FUNC
    onComplete: FUNC
}

function Task(props: IProps){
    const defaultState: DataSql.Task = {
        title: "",
        subject: null,
        developer: [],
        status: false,
        testTime: '',
        describe: '',
        producter: 0,
        formalTime: '',
        comment: ''
    }
    const [visible,setVisible] = useState(false)
    const [developers,setDevelopers] = useState([])
    const [subjects,setSubjects] = useState([])
    const [form] = Form.useForm()
    const [state,setState] = useState<OBJ>(defaultState)
    function wrapSetState(states: OBJ){
        const data = {...state,...states}
        setState(data)
        return data
    }
    props.onRef({
        visible: (id?: number) => {
            if(id){
                DataSql.Query("task",id).then((res: OBJ) => {
                    form.setFieldsValue(wrapSetState(res))
                    setVisible(true)
                })
            }else{
                setState(defaultState)
                form.setFieldsValue(defaultState)
                setVisible(true)
            }
            
        }
    })
    function cancel(){
        form.resetFields()
        setVisible(false)
    }
    function complete(data,id) {
        const main = id ?  DataSql.Update("task",{id,...data}) : DataSql.Write("task",data)
        main.then(() => {
            setVisible(false)
            props.onComplete(data.id)
        }).catch(console.log)
    }
    function finish() {
        const formData = form.getFieldsValue()
        const { subject , title , describe , developer , comment } = formData
        const { producter , testTime , formalTime , id } = state
        complete({subject , describe , developer , comment,producter , title , testTime , formalTime},id)
    }
    function chooseDate(name,date) {
        wrapSetState({[name]: date ? date.valueOf() : date})
    }
    useEffect(() => {
        DataSql.GetData(DataSql.DB_TABLE_SUBJECT).then(res => setSubjects(res))
        DataSql.GetData(DataSql.DB_TABLE_DEVELOPER).then(res => setDevelopers(res))
    },[])
    return <>
        <Modal title="新增任务" visible={visible} okText="保存" cancelText="取消" onCancel={cancel} onOk={finish}>
            <div key={state.id}>
                <Form
                    name="normal_login"
                    className="login-form"
                    labelCol={{ span: 4 }}
                    form={form}
                    initialValues={state}
                    onFinish={finish}>
                    <Form.Item name="subject" label="项目名称" >
                        <Select
                            placeholder="请选择项目"
                            allowClear
                        >
                            {
                                subjects.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="title" label="迭代主题">
                        <Input placeholder="迭代主题" />
                    </Form.Item>
                    <Form.Item name="describe" label="需求描述">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="developer" label="开发者">
                        <Select
                            placeholder="参与的开发者"
                            allowClear
                            mode="multiple"
                        >
                            {
                                developers.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="提测时间">
                        <DatePicker defaultValue={state.testTime ? moment(state.testTime) : null} onChange={date => chooseDate('testTime',date)} locale={locale} />
                    </Form.Item>
                    <Form.Item label="发版时间">
                        <DatePicker defaultValue={state.formalTime ? moment(state.formalTime) : null} onChange={date => chooseDate('formalTime',date)} locale={locale} />
                    </Form.Item>
                    <Form.Item name="comment" label="备注">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </>
}

export default React.memo(Task)