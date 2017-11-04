import{dom,moduleLoader}from'/lib/core.static.js'
import createSiteNode from './ControlPanel/createSiteNode.js'
import createTagsNode from './ControlPanel/createTagsNode.js'
import style from './ControlPanel/style.js'
import TreeUi from './ControlPanel/TreeUi.js'
let
    css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
    ]
function ControlPanel(){
    TreeUi.apply(this,arguments)
    this._nodes={}
    this.node=dom.div({className:'controlPanel'},
        this._nodes.title=dom.h2(),
    )
    ;(async()=>{
        let module=await moduleLoader()
        await module.scriptByPath('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js')
        this.in({
            title:'Blog Control Panel',
            node:dom.div({className:'shadow'},
                dom.ul({className:'mdc-list'},
                    dom.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:'Site',
                                node:createSiteNode.call(this)
                            }),
                        },
                        'Site',
                        dom.a({
                            className:`
                                mdc-list-item__end-detail
                                material-icons
                            `
                        },'chevron_right'),
                    ),
                    dom.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:'Tags',
                                node:createTagsNode.call(this)
                            }),
                        },
                        'Tags',
                        dom.a({
                            className:`
                                mdc-list-item__end-detail
                                material-icons
                            `
                        },'chevron_right'),
                    ),
                )
            )
        })
    })()
}
Object.setPrototypeOf(ControlPanel.prototype,TreeUi.prototype)
ControlPanel.style=async function(){
    let module=await moduleLoader()
    return style+(
        await Promise.all(css.map(s=>module.getByPath(s)))
    ).join('')
}
export default ControlPanel
