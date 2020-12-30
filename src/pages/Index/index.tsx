import React from "react"
import { Navigation } from "src/utils"
export default class Index extends React.Component {
    componentDidMount(){
        console.log(Navigation.GetPathFromName('home',{id: 5}))
    }
    render(){
        return <>this is <span onClick={Navigation.pushCall('home',{id: 4})}>Index</span></>
    }
}