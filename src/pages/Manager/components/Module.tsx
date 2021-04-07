import React from "react"
import { Button , Switch } from 'antd'
import { DataSql } from "src/utils"

interface ActionProps {
    id: number
    onEidt: FUNC
    onDel: FUNC
}

function Action(props: ActionProps) {
    return <>
        <Button type="primary" size="small" onClick={() => props.onEidt(props.id)}>编辑</Button>
        <Button type="primary" style={{marginLeft: '15px'}} danger size="small" onClick = {() => props.onDel(props.id)}>删除</Button>
    </>
}

function WrapSwitch(props: DataSql.Task) {
    const change = checked => {
        props.status = checked
        DataSql.Update("task",props)
    }
    return <Switch defaultChecked={props.status} size="small" onChange={change} />
}

export {
    Action,
    WrapSwitch
}