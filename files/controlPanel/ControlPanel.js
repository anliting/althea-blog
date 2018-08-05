import{doe}from             '/lib/core.static.js'
import createSiteNode from      './ControlPanel/createSiteNode.js'
import createCommentsNode from  './ControlPanel/createCommentsNode.js'
import createTagsNode from      './ControlPanel/createTagsNode.js'
import style from               './ControlPanel/style.js'
import TreeUi from              './ControlPanel/TreeUi.js'
let
    root=[
        {
            title:'Site',
            function:createSiteNode,
        },
        {
            title:'Comments',
            function:createCommentsNode,
        },
        {
            title:'Tags',
            function:createTagsNode,
        },
    ]
function ControlPanel(io){
    TreeUi.apply(this,arguments)
    this._io=io
    this._nodes={}
    this.node=doe.div({className:'controlPanel mdc-typography'},
        this._nodes.title=doe.h2(),
    )
    this.in({
        title:'Blog Control Panel',
        node:doe.div({className:'shadow'},
            doe.ul({className:'mdc-list'},
                ...root.map(o=>
                    doe.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:o.title,
                                node:o.function.call(this),
                            }),
                        },
                        o.title,
                        doe.span({
                            className:`
                                mdc-list-item__end-detail
                                material-icons
                            `
                        },'chevron_right'),
                    )
                ),
            )
        )
    })
}
Object.setPrototypeOf(ControlPanel.prototype,TreeUi.prototype)
ControlPanel.style=style
export default ControlPanel
