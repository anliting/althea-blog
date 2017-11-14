import{dom,moduleLoader}from'/lib/core.static.js'
let
    root='https://unpkg.com/material-components-web@0.24.0/dist',
    css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        `${root}/material-components-web.min.css`,
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
                module.scriptByPath(
                    `${root}/material-components-web.min.js`
                ),
            ])
        })()
    return loaded
}
export default loadMaterial
