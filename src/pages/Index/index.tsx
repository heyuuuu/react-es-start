import React, { createRef , RefObject} from "react"
import { connect } from "react-redux"
import Navigation from "react-router-nav"
import style from "./index.less"

function reduxify(mapStateToProps, mapDispatchToProps?, mergeProps?, options?) {
    /* eslint-disable */
    return target => (connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(target) as any);
}
@reduxify(
    (state) => ({ text: state.text })
)
export default class Index extends React.Component {
    protected showNode: RefObject<HTMLDivElement>
    constructor(props: Record<string,unknown>){
        super(props)
        this.showNode = createRef()
        this.requestAnimationFrame = this.requestAnimationFrame.bind(this)
    }
    componentDidMount(){
        // console.log(Navigation)
        console.log(Navigation.GetHrefFromName('home',{id:5}))
    }
    requestAnimationFrame(){
        const palceWidth = 300
        const showNode = this.showNode.current
        let timer
        const calculate = () => {
            const width = showNode.style.width || '0'
            if(parseInt(width) < palceWidth){
                showNode.style.width = parseInt(width) + 5 + 'px';
                showNode.innerHTML =     parseInt(width)/palceWidth*100 + '%';
                timer = window.requestAnimationFrame(calculate);
            }else{
                cancelAnimationFrame(timer);
            }
        }
        timer = window.requestAnimationFrame(calculate)
    }
    render(){
        console.log("index-render")
        return <div className={style.container}>
            <p>
                <span onClick={Navigation.pushCall('home',{id: 4})}>home</span>
                <span onClick={this.requestAnimationFrame}>动画GO</span>
            </p>
            <div className={style.frame} ref={this.showNode}></div>
        </div>
    }
}