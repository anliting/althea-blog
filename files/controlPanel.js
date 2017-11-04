import{Site,dom,moduleLoader}from'/lib/core.static.js'
import ControlPanel from './controlPanel/ControlPanel.js'
let
    css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
    ],
    site=new Site,
    controlPanel=new ControlPanel
controlPanel.send=site.send.bind(site)
;(async()=>{
    let module=await moduleLoader()
    dom.head(
        dom.style(
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
            await Promise.all(css.map(s=>module.getByPath(s))),
            ControlPanel.style,
        )
    )
    dom.body(
        dom(controlPanel.node)
    )
})()
