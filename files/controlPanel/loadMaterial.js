import{dom,moduleLoader}from'/lib/core.static.js'
let
    css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
    ],
    loaded
function loadMaterial(){
    if(!loaded)
        loaded=(async()=>{
            let module=await moduleLoader()
            await Promise.all([
                (async()=>{
                    dom.head(dom.style(
                        await Promise.all(css.map(s=>module.getByPath(s)))
                    ))
                })(),
                module.scriptByPath('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'),
            ])
        })()
    return loaded
}
export default loadMaterial
