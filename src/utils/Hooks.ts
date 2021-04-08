import React from 'react'
import { Input } from 'antd'

function useForm<T = any>(initDefauleValue = {}){
    const formData = {}
    const elAction = {}
    let callback: FUNC
    let nextMain = null
    const dispatch = () => {
        clearTimeout(nextMain)
        nextMain = setTimeout(() => {
            callback instanceof Function && callback(formData,initDefauleValue)
        })
    }
    const setValue = (name,value) => {
        formData[name] = value
        elAction[name] instanceof Function && elAction[name](value)
        dispatch()
    }
    const setValues = (values: OBJ,consultVals = values) => {
        Object.keys(values).map(name => setValue(name,consultVals[name]))
    }
    return {
        files: formData as T,
        insertAntdInput(el: Input){
            const name = el?.props.name
            if(name){
                elAction[name] = el.setValue.bind(el)
                setValue(name,initDefauleValue[name])
                el.handleChange = ev => {
                    setValue(name,ev.target.value)
                }
            }
        },
        reset(){
            setValues(formData,initDefauleValue)
        },
        setValue(values: OBJ){
            setValues(values)
        },
        onChange(feedback: (formData: T,initDefauleValue: T) => void){
            callback = feedback
        }
    }
}

export default {
    useForm
}