import{Site,dom}from'/lib/core.static.js'
import ControlPanel from './controlPanel/ControlPanel.js'
let site=new Site
dom.head(
    dom.link({rel:'stylesheet',href:'https://fonts.googleapis.com/icon?family=Material+Icons'}),
    dom.link({rel:'stylesheet',href:'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css'}),
    dom.style(`
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
    `,ControlPanel.style)
)
let controlPanel=new ControlPanel
controlPanel.send=site.send.bind(site)
dom.body(
    dom(controlPanel.node)
)
