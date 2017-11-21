let
    rollup=require('rollup'),
    skip=[
        '/lib/core.static.js',
        '/plugins/blog/core.static.js',
        'https://gitcdn.link/cdn/anliting/simple.js/3b5e122ded93bb9a5a7d5099ac645f1e1614a89b/src/simple.static.js',
    ]
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
        external:s=>skip.includes(s),
    })
    await bundle.write({
        file,
        format:'es',
        paths:s=>skip.includes(s)&&s,
    })
}
;(async()=>{
    await link(`files/blog.js`,`files/blog.static.js`)
    await link(`files/controlPanel.js`,`files/controlPanel.static.js`)
    await link(`files/core.js`,`files/core.static.js`)
})()
