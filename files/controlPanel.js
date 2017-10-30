import{dom}from'/lib/core.static.js'
import ControlPanel from './controlPanel/ControlPanel.js'
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
dom.body(
    dom((new ControlPanel).ui,
        n=>{n.classList.add('main')}
    )
)
