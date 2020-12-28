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
        return path.replace(/\/:(\w+)/g,(_,k) => params[k] ? '/' + params[k] : '' )
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

// 转换携带参数
function TransFromSearch(params: string | object = {}): string{
    return typeof params === "string" ? params : Qs.stringify(params)
}

function push(name: string,params = {},search: string | object = {}){
    const fullpath = TransPathFromName(name,params)
    if(fullpath){
        ReactHistory.push({pathname: fullpath,search: TransFromSearch(search)})
    }
}

function replace(name: string,params = {},search: string | object = {}){
    const fullpath = TransPathFromName(name,params)
    if(fullpath){
        ReactHistory.replace({pathname: fullpath,search: TransFromSearch(search)})
    }
}

function pushCall(name: string,params = {},search: string | object = {}){
    return () => push(name,params,search)
}

function replaceCall(name: string,params = {},search: string | object = {}){
    return () => replace(name,params,search)
}

export default {
    push,
    replace,
    pushCall,
    replaceCall,
    CreateFullPath
}