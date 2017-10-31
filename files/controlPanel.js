import{Site,dom}from'/lib/core.static.js'
import ControlPanel from './controlPanel/ControlPanel.js'
let site=new Site
dom.head(
    dom.style(`
        body{
            font-family:sans-serif;
            background-color:#eee;
            overflow-y:scroll;
        }
        body>.main{
            max-width:600px;
            margin:0 auto;
        }
    `,ControlPanel.style)
)
let controlPanel=new ControlPanel
controlPanel.send=site.send.bind(site)
dom.body(
    dom(controlPanel.ui,
        n=>{n.classList.add('main')}
    )
)
