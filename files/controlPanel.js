import{Site,dom}from        '/lib/core.static.js'
import loadMaterial from    './controlPanel/loadMaterial.js'
import ControlPanel from    './controlPanel/ControlPanel.js'
let site=new Site
;(async()=>{
    await loadMaterial()
    let controlPanel=new ControlPanel
    controlPanel.send=site.send.bind(site)
    dom.head(dom.style(
        `
            body{
                margin:0;
                overflow-y:scroll;
                background-color:#eee;
                font-family:sans-serif;
            }
            body>.controlPanel{
                max-width:600px;
                margin:0 auto;
            }
        `,
        ControlPanel.style,
    ))
    dom.body(
        dom(controlPanel.node)
    )
})()
