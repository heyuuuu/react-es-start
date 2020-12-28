import { History } from "history"
import Qs from "qs"

let ReactHistory: History
const ReactRoutes: object = {}

// 注入路由配置
export function NavigationInject(_ReactHistory: History,_Routes: Array<RouteItem>){
    ReactHistory = _ReactHistory
    _Routes.map(item => {
        if(ReactRoutes.hasOwnProperty(item.name)){
            console.error(`route-name(${item.name})有重复，请重命名`)
        }else{
            ReactRoutes[item.name] = item.path
        }
    })
}

// 生成路由
function TransPathFromName(name: string,params = {}): string | void{
    const path = ReactRoutes[name]
    if(path){
        return path.replace(/\/:(\w+)/g,(fk,k) => params[k] ? '/' + params[k] : '' )
    }else{
        console.error(`没有找到${name}路由`)
    }
}

// 生成完整路径
function CreateFullPath(name: string,params = {},search = {}): string | void{
    const fullpath = TransPathFromName(name,params)
    if(fullpath){
        return window.location.origin + '/' + ReactHistory.createHref({pathname: fullpath,search: Qs.stringify(search)})
    }
}

function push(name: string,params = {},search: string | object = {}){
    
}

function replace(name: string,params = {},search: string | object = {}){

}

function pushCall(name: string,params = {},search: string | object = {}){

}

function replaceCall(name: string,params = {},search: string | object = {}){

}

export default {
    push,
    replace,
    pushCall,
    replaceCall,
    CreateFullPath
}