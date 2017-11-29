import{dom,load}from        '/lib/core.static.js'
import{Site}from            '/plugins/blog/core.static.js'
import ControlPanel from    './controlPanel/ControlPanel.js'
let site=new Site
;(async()=>{
    await load.material()
    let controlPanel=new ControlPanel
    controlPanel.site=site
    controlPanel.send=site.send.bind(site)
    dom.head(dom.style(
        `
            a:active,a:link,a:hover,a:visited{
                color:blue;
            }
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
