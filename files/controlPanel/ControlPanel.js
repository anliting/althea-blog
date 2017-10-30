import{dom}from'/lib/core.static.js'
import createSiteNode from './ControlPanel/createSiteNode.js'
import createTagsNode from './ControlPanel/createTagsNode.js'
import style from './ControlPanel/style.js'
function ControlPanel(){
    this.array=[]
    this.ui=dom.div({className:'controlPanel'},
        dom.h2('Blog Control Panel'),
    )
    this.in(dom.div({className:'material menu'},
        dom.div({
            className:'in',
            onclick:()=>{
                this.in(createSiteNode.call(this))
            },
        },'Site'),
        dom.div({
            className:'in',
            onclick:()=>{
                this.in(createTagsNode.call(this))
            },
        },'Tags'),
    ))
}
ControlPanel.prototype.in=function(e){
    if(this.array.length)
        this.ui.removeChild(this.array[this.array.length-1])
    this.array.push(e)
    this.ui.appendChild(e)
}
ControlPanel.prototype.out=function(){
    this.ui.removeChild(this.array.pop())
    if(this.array.length)
        this.ui.appendChild(this.array[this.array.length-1])
}
ControlPanel.style=style
export default ControlPanel
