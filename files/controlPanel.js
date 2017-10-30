import{dom}from'/lib/core.static.js'
import ControlPanel from './controlPanel/ControlPanel.js'
dom.head(
    dom.style(ControlPanel.style)
)
dom.body(
    dom((new ControlPanel).ui,
        n=>{n.classList.add('main')}
    )
)
