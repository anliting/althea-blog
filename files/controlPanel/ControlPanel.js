import{dom}from'/lib/core.static.js'
import createSiteNode from './ControlPanel/createSiteNode.js'
import createTagsNode from './ControlPanel/createTagsNode.js'
import style from './ControlPanel/style.js'
import TreeUi from './ControlPanel/TreeUi.js'
function ControlPanel(){
    TreeUi.apply(this,arguments)
    this.node=dom.div({className:'controlPanel'},
        dom.h2('Blog Control Panel'),
    )
    this.in(dom.div({className:'material menu'},
        dom.div({
            className:'in',
            onclick:()=>this.in(createSiteNode.call(this)),
        },'Site'),
        dom.div({
            className:'in',
            onclick:()=>this.in(createTagsNode.call(this)),
        },'Tags'),
    ))
}
Object.setPrototypeOf(ControlPanel.prototype,TreeUi.prototype)
ControlPanel.style=style
export default ControlPanel
